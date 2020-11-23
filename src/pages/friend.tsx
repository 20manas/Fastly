import React, {useState, useEffect, FormEvent} from 'react';
import Head from 'next/head';

import loginstyles from '../styles/login.module.css';

const Friends = () => {
  const [list, setList] = useState(null);

  useEffect(() => {
    fetch('getfriends')
        .then(result => result.json())
        .then(list => setList(
            list.map(
                (user: {username: string}) => (<li key={user.username}>{user.username}</li>),
            ),
        ));
  }, []);

  return (<ul>{list}</ul>);
};

const Request = () => {
  const [list, setList] = useState(null);

  useEffect(() => {
    fetch('/getsentrequests')
        .then(result => result.json())
        .then(list => setList(
            list.map(
                (user: {username: string}) => (<li key={user.username}>{user.username}</li>),
            ),
        ));
  }, []);

  return (
    <form className="add-friend" onSubmit={sendFriendRequest}>
      <h2>Send Friend Request</h2>
      <ul>{list}</ul>
      <label htmlFor="username">
        <span>Username</span>
        <input type="text" name="username" />
      </label>
      <input type="submit" value="SUBMIT" />
    </form>
  );
};

const Accept = () => {
  const [list, setList] = useState(null);

  useEffect(() => {
    fetch('/getfriendrequests')
        .then(result => result.json())
        .then(list => setList(
            list.map(
                (user: {username: string}) => (<li key={user.username}>{user.username}</li>),
            ),
        ));
  }, []);

  return (
    <form className="accept-friend" onSubmit={acceptFriendRequest}>
      <h2>Accept Friend Request</h2>
      <ul>{list}</ul>
      <label htmlFor="username">
        <span>Username</span>
        <input type="text" name="username" />
      </label>
      <input type="submit" value="SUBMIT" />
    </form>
  );
};

const Friend = () => (
  <section className={loginstyles.card}>
    <Head>
      <title>Friends</title>
    </Head>
    <Friends />
    <Request />
    <Accept />
  </section>
);

const fetchPut = async (url: string, data: Record<string, string>) => {
  console.log(JSON.stringify(data));
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

const extractFromForm = (form: string) => {
  const values: Record<string, string> = {};
  const elems = document.querySelectorAll(`${form} input:not([type=submit])`);
  for (const el of Array.from(elems)) {
    const name = el.getAttribute('name');

    if (name) {
      values[name] = (el as HTMLInputElement).value;
    }
  }
  return values;
};

const sendFriendRequest = async (ev: FormEvent<HTMLFormElement>) => {
  ev.preventDefault();
  await fetchPut('/addfriend', extractFromForm('form.add-friend'));
  console.log('Friend Request sent');
};

const acceptFriendRequest = async (ev: FormEvent<HTMLFormElement>) => {
  ev.preventDefault();
  await fetchPut('/acceptfriend', extractFromForm('form.accept-friend'));
  console.log('Friend Request sent');
};

export default Friend;
