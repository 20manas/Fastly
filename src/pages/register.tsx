import React from 'react';
import {Layout} from '../components/layout';
import loginstyles from '../styles/login.module.css';

const Register = () => (
  <Layout>
    <section className={loginstyles.card}>
      <h2>Register</h2>
      <form action="/register" method="POST">
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
      </form>
    </section>
  </Layout>
);

export default Register;
