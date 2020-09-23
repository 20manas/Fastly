import React from 'react';

type User = undefined | {
  name?: string
};

interface HelloProps {
  user: User;
}

interface LayoutProps {
  user: User;
  children: React.ReactNode;
}

const Hello = ({user}: HelloProps) =>
  user?.name ? <h1>Hello, {user.name}</h1> : <></>;

const Layout = ({user, children}: LayoutProps) => (
  <>
    <p>Test Website</p>
    <Hello user={user} />
    {children}
  </>
);

export {Layout};

export type {User};
