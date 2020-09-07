import React from 'react';

const Layout = (json: any, Body: JSX.Element): JSX.Element => (
  <html>
    <head></head>
    <body>
      <h1>Hello, {json?.user?.name}</h1>
      {Body}
    </body>
  </html>
);

export default Layout;
