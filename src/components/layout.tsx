import React from 'react';
import useSwr from 'swr';

export type User = undefined | {
  name: string
};

interface LayoutProps {
  children: React.ReactNode;
}

const Hello = () => {
  const {data: user} = useSwr<User, undefined>(
      '/user',
      async (url) => await fetch(url).then(res => res.json()),
  );
  if (user) {
    return <span className="hello">Hello, {user.name}</span>;
  } else {
    return <></>;
  }
};

export const Layout = ({children}: LayoutProps) => (
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
    {children}
  </>
);
