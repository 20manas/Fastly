import React from 'react';
import {useRouter} from 'next/router';

import useUser from '../data/user';
import styles from '../styles/loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <h1>Loading</h1>
    </div>
  );
};

const EnsureAuth = ({children}: {children: JSX.Element}) => {
  const router = useRouter();
  const {isLoading, isError} = useUser();

  if (isError) router.push('/login');

  if (isLoading || isError) {
    return (<Loading />);
  } else {
    return children;
  }
};

export default EnsureAuth;
