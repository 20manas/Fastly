import React from 'react';
import useSwr from 'swr';

type User = undefined | {
  name: string
};

interface LayoutProps {
  children: React.ReactNode;
}

const Hello = () => {
  const {data} = useSwr<User, undefined>(
      '/user',
      async (url) => await fetch(url).then(res => res.json()),
  );
  if (data) {
    return <h1>Hello, {data.name}</h1>;
  } else {
    return <></>;
  }
};

const Layout = ({children}: LayoutProps) => (
  <>
    <p>Test Website</p>
    <Hello/>
    {children}
  </>
);

export {Layout};

export type {User};
