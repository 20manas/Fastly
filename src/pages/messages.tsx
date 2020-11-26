import React, {useEffect, useState, FormEvent} from 'react';
import Head from 'next/head';

import useUser from '../data/user';
import styles from '../styles/messages.module.scss';

const Friends = (
    {
      selectedFriend,
      setSelectedFriend,
    }: {
      selectedFriend: string,
      setSelectedFriend: React.Dispatch<React.SetStateAction<string>>,
    },
) => {
  interface Friend {
    username: string;
    name: string;
  }

  const [list, setList] = useState<Array<Friend>>([]);

  useEffect(() => {
    fetch('/getfriends')
        .then(result => result.json())
        .then(result => {
          result.push({username: 'sample', name: 'sample'});
          setList(result);
        });
  }, []);

  return (
    <section className={styles.friends}>
      <ul>
        {
          list.map(friend => (
            <li
              onClick={() => setSelectedFriend(friend.username)}
              key={friend.username}
              className={friend.username == selectedFriend ? styles.current : ''}
            >{friend.name}</li>
          ))
        }
      </ul>
    </section>
  );
};

let ws: null | WebSocket;

const Chat = ({selectedFriend}: {selectedFriend: string}) => {
  interface Message {
    sender: string;
    receiver: string;
    content: string;
    date: string;
  }

  const {user} = useUser();

  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    ws = new WebSocket('ws://localhost:3000/chat');
    ws.addEventListener('open', () => {
      (ws as WebSocket).send(JSON.stringify({content: 'something from client'}));
    });

    ws.addEventListener('message', data => {
      setMessages(prevMessages =>
        prevMessages
            .concat(JSON.parse(data.data))
            .sort((mes1, mes2) => Date.parse(mes1.date) - Date.parse(mes2.date)),
      );
    });
  }, []);

  useEffect(() => {
    if (selectedFriend === '') return;

    fetch('/getchat', {
      body: JSON.stringify({
        friend: selectedFriend,
      }),
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(res => res.json())
        .then(res => {
          setMessages(prevMessages =>
            prevMessages
                .concat(res)
                .sort((mes1, mes2) => Date.parse(mes1.date) - Date.parse(mes2.date)),
          );
        });
  }, [selectedFriend]);

  if (!user) return (<></>);

  const sendMessage = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!ws) return;

    const textarea = (document.getElementById('message') as HTMLTextAreaElement);

    ws.send(JSON.stringify({
      sender: user.username,
      receiver: selectedFriend,
      message: textarea.value,
    }));

    textarea.value = '';
  };

  return (
    <section className={styles.chat}>
      <article>
        <ul>
          {
            messages
                .filter(message =>
                  message.sender === selectedFriend ||
                  message.receiver === selectedFriend,
                ).map(message => (
                  <li
                    key={Date.parse(message.date)}
                    className={message.sender === user.username ? styles.sent : styles.received}
                  >
                    {message.content}
                  </li>
                ))
          }
        </ul>
      </article>
      <form onSubmit={sendMessage}>
        <textarea name="content" id="message"></textarea>
        <input type="submit" value="SEND"/>
      </form>
    </section>
  );
};

const Messages = () => {
  const [selectedFriend, setSelectedFriend] = useState('');

  return (
    <>
      <Head>
        <title>Messages</title>
      </Head>
      <Friends
        selectedFriend={selectedFriend}
        setSelectedFriend={setSelectedFriend}
      />
      <Chat selectedFriend={selectedFriend} />
    </>
  );
};

export default Messages;
