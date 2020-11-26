import React from 'react';
import Head from 'next/head';

import styles from '../styles/index.module.scss';

const Index = () => (
  <section className={styles.card}>
    <Head>
      <title>Home</title>
    </Head>
    <h1>Welcome to the Final Problem</h1>
  </section>
);

export default Index;
