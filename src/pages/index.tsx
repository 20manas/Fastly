import React from 'react';
import {Layout, User} from '../components/layout';

interface IndexProps {
  user: User
}

const Index = ({user}: IndexProps) => (
  <Layout user={user}>
    <h1>Welcome to the Final Problem</h1>
  </Layout>
);

export default Index;
