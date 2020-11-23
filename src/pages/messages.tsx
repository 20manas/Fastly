import React, {useEffect, useState, FormEvent} from 'react';
import Head from 'next/head';

import loginStyles from '../styles/login.module.css';

import useUser from '../data/user';

let ws: null | WebSocket = null;

const sendMessage = (ev: FormEvent<HTMLFormElement>) => {
  ev.preventDefault();

  const {user} = useUser();

  if (ws === null || !user) return;

  ws.send(JSON.stringify({
    sender: user.username,
    receiver: (document.getElementsByName('receiver')[0] as HTMLInputElement).value,
    message: (document.getElementsByName('content')[0] as HTMLInputElement).value,
  }));
};

const Messages = () => {
  const [messages, setMessages] = useState(<></>);

  useEffect(() => {
    ws = new WebSocket('ws://localhost:3000/chat');

    ws.addEventListener('open', () => {
      (ws as WebSocket).send(JSON.stringify({content: 'something from client'}));
    });

    ws.addEventListener('message', (data: any) => {
      setMessages(<li>{data.data}</li>);
    });
  }, []);

  return (
    <section className={loginStyles.card}>
      <Head>
        <title>Messages</title>
      </Head>
      <h2>Messages</h2>
      <ul>{messages}</ul>
      <form onSubmit={sendMessage}>
        <label htmlFor="receiver">
          Receiver
          <input type="text" name="receiver"/>
        </label>
        <label htmlFor="content">
          Content
          <input type="text" name="content"/>
        </label>
        <input type="submit" value="Send"/>
      </form>
    </section>
  );
};

export default Messages;
