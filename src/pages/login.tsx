import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/login.module.scss';
import Header from '../components/header';

const Login = () => (
  <section>
    <Head>
      <title>Login</title>
    </Head>
    <Header />
    <form className={styles.card} method="POST" action="/login">
      <h2>Login</h2>
      <label htmlFor="username">
        <span>Username</span>
        <input type="text" name="username" id="username" />
      </label>

      <label htmlFor="password">
        <span>Password</span>
        <input type="password" name="password" id="password" />
      </label>

      <input type="submit" value="GO" />

      <Link href="/register"><a>Register</a></Link>
    </form>
  </section>
);

export default Login;
