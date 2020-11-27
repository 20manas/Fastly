import React from 'react';
import type {AppProps} from 'next/app';

const App = ({Component, pageProps}: AppProps) => (
  <>
    <style jsx global>{`
      body {
        font-family: sans-serif;
        margin: 0;
      }
    `}</style>

    <Component {...pageProps} />
  </>
);

export default App;
