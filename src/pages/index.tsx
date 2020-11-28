import React, {useEffect, useState, FormEvent} from 'react';
import Head from 'next/head';
import Link from 'next/link';

import useUser, {User} from '../data/user';
import styles from '../styles/index.module.scss';
import EnsureAuth from '../components/auth';

const Hello = () => {
  const {user} = useUser() as {user: User};
  return (<span>Hello, {user.name}</span>);
};

const Logout = () => (
  <span className={styles.logout}>
    <Link href="/logout"><a>Logout</a></Link>
  </span>
);

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
      <Hello />
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
      <Logout />
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

  const {user} = useUser() as {user: User};

  const [messages, setMessages] = useState<Array<Message>>([]);
  const [chatsLoaded, setChatsLoaded] = useState<Record<string, number>>({});

  useEffect(() => {
    ws = new WebSocket('ws://localhost:3000/chat');
    ws.addEventListener('open', () => {
      (ws as WebSocket).send(JSON.stringify({content: 'something from client'}));
    });

    ws.addEventListener('message', data => setMessages(
        prevMessages => prevMessages
            .concat(JSON.parse(data.data))
            .sort((mes1, mes2) => Date.parse(mes1.date) - Date.parse(mes2.date)),
    ));
  }, []);

  const getChat = (friend: string, limit: number, offset: number): Promise<Array<Message>> => {
    return fetch('/getchat', {
      body: JSON.stringify({
        friend,
        limit,
        offset,
      }),
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json());
  };

  useEffect(() => {
    if (selectedFriend === '') return;

    if (!(selectedFriend in chatsLoaded)) {
      getChat(selectedFriend, 50, 0)
          .then(res => setMessages(
              prevMessages => prevMessages
                  .concat(res)
                  .sort((mes1, mes2) => Date.parse(mes1.date) - Date.parse(mes2.date)),
          ));
      setChatsLoaded({...chatsLoaded, [selectedFriend]: 50});
    }
  }, [selectedFriend]);

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
                  <div
                    key={Date.parse(message.date)}
                    className={message.sender === user.username ? styles.sent : styles.received}
                  >
                    <li
                    >
                      {message.content}
                    </li>
                  </div>
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

const Index = () => {
  const [selectedFriend, setSelectedFriend] = useState('');

  return (
    <EnsureAuth>
      <>
        <Head>
          <title>Messages</title>
        </Head>
        <section
          className={`${styles.main} ${selectedFriend !== '' ? styles.selected: ''}`}
        >
          <Friends
            selectedFriend={selectedFriend}
            setSelectedFriend={setSelectedFriend}
          />
          {
            selectedFriend !== '' ?
              <Chat selectedFriend={selectedFriend} /> :
              <></>
          }
        </section>
      </>
    </EnsureAuth>
  );
};

export default Index;
