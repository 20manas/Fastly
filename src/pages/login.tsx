import React from 'react';
import {Layout} from '../components/layout';
import styles from '../styles/login.module.css';

const Login = () => (
  <Layout>
    <section className={styles.card}>
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
  </Layout>
);

export default Login;
