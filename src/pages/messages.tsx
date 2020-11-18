import React, {useEffect, useState, FormEvent} from 'react';
import {Layout} from '../components/layout';
import loginStyles from '../styles/login.module.css';

let ws: any = null;

const sendMessage = (ev: FormEvent<HTMLFormElement>) => {
  ev.preventDefault();

  if (!ws.send) return;
  ws.send(JSON.stringify({
    sender: document.getElementsByName('sender')[0].value,
    receiver: document.getElementsByName('receiver')[0].value,
    message: document.getElementsByName('content')[0].value,
  }));
};

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    ws = new WebSocket('ws://localhost:3000/message');

    ws.addEventListener('open', () => ws.send(JSON.stringify({content: 'something from client'})));

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
