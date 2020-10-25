import React from 'react';
import {Layout} from '../components/layout';

const Register = () => (
  <Layout>
    <section>
      <h2>Register</h2>
      <form action="/register" method="POST">
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" />
        <br />

        <label htmlFor="email">E-mail: </label>
        <input type="text" name="email" id="email" />
        <br />

        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" />
        <br />

        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" />
        <br />

        <label htmlFor="password2">Confirm Password: </label>
        <input type="password" name="password2" id="password2" />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </section>
  </Layout>
);

export default Register;
