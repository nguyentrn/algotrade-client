import Head from 'next/head';
import { useUpdate } from 'react-use';

import useLogin from '../hooks/useLogin';
import DashboardLayout from './DashboardLayout';
import LoginLayout from './ContainerLayout';
import { Flex } from '@chakra-ui/react';

const App = (props) => {
  const session = useLogin();

  return (
    <Flex flexDir="column" bg="primaryAlpha.50">
      <Head>
        <link rel="apple-touch÷-icon" sizes="180x180" href="/icons/favicon.png" />
        <link rel="icon" type="image/png" href="/icons/favicon.png" />
        <link rel="mask-icon" href="/icons/favicon.png" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="google-signin-client_id"
          content="635333658194-msoha25po8vllive9cbo1bp3abu7pkae.apps.googleusercontent.com"
        />
        <title>AlgoTrade</title>
      </Head>

      {session ? <DashboardLayout {...props} /> : <LoginLayout {...props} />}
    </Flex>
  );
};

export default App;
