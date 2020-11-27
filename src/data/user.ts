import useSwr from 'swr';

interface User {
  name: string;
  username: string;
}

const useUser = () => {
  const {data, error} = useSwr<User, Error>(
      '/user',
      url => fetch(url).then(res => res.json()),
  );

  return {
    user: data,
    isLoading: !data && !error,
    isError: !!error,
  };
};

export default useUser;
