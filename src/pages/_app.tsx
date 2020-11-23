import React from 'react';
import type {AppProps} from 'next/app';

import useUser from '../data/user';

const Hello = () => {
  const {user} = useUser();
  if (user) {
    return <span className="hello">Hello, {user.name}</span>;
  } else {
    return <></>;
  }
};

const App = ({Component, pageProps}: AppProps) => (
  <>
    <style jsx global>{`
      body {
        font-family: sans-serif;
      }
      header {
        height: 50px;
        width: 100vw;
        background-color: black;
        color: white;
        position: absolute;
        left: 0;
        top: 0;
      }
      header span {
        margin: 10px 30px;
        float: left;
      }
      header span.hello {
        float: right;
      }
    `}</style>
    <header>
      <span>Test</span>
      <Hello />
    </header>
    <Component {...pageProps} />
  </>
);

export default App;
