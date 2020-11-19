import React, {useEffect, useState, FormEvent} from 'react';

import {Layout} from '../components/layout';
import loginStyles from '../styles/login.module.css';

let ws: null | WebSocket = null;

const sendMessage = (ev: FormEvent<HTMLFormElement>) => {
  ev.preventDefault();

  if (ws === null) return;
  ws.send(JSON.stringify({
    sender: (document.getElementsByName('sender')[0] as HTMLInputElement).value,
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
    <Layout>
      <section className={loginStyles.card}>
        <h2>Messages</h2>
        <ul>{messages}</ul>
        <form onSubmit={sendMessage}>
          <input type="text" name="sender"/>
          <input type="text" name="receiver"/>
          <input type="text" name="content"/>
          <input type="submit" value="Send"/>
        </form>
      </section>
    </Layout>
  );
};

export default Messages;
