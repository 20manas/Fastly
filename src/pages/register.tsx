import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import loginstyles from '../styles/login.module.scss';
import Header from '../components/header';

const Register = () => (
  <section>
    <Head>
      <title>Register</title>
    </Head>
    <Header />
    <form className={loginstyles.card} action="/register" method="POST">
      <h2>Register</h2>
      <label htmlFor="name">
        <span>Name</span>
        <input type="text" name="name" id="name" />
      </label>

      <label htmlFor="email">
        <span>E-mail</span>
        <input type="text" name="email" id="email" />
      </label>

      <label htmlFor="username">
        <span>Username</span>
        <input type="text" name="username" id="username" />
      </label>

      <label htmlFor="password">
        <span>Password</span>
        <input type="password" name="password" id="password" />
      </label>

      <label htmlFor="password2">
        <span>Confirm Password</span>
        <input type="password" name="password2" id="password2" />
      </label>

      <input type="submit" value="Submit" />
      <Link href="/login"><a>Login</a></Link>
    </form>
  </section>
);

export default Register;
