import React from 'react';
import Head from 'next/head';

import styles from '../styles/login.module.scss';

const Login = () => (
  <section className={styles.card}>
    <Head>
      <title>Login</title>
    </Head>
    <h2>Login</h2>
    <form method="POST" action="/login">
      <label htmlFor="username">
        <span>Username</span>
        <input type="text" name="username" id="username" />
      </label>

      <label htmlFor="password">
        <span>Password</span>
        <input type="password" name="password" id="password" />
      </label>

      <input type="submit" value="SUBMIT" />
    </form>
  </section>
);

export default Login;
