import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

const Error = (props) => {
  return (
    <Alert status="error" {...props}>
      <AlertIcon />
      <AlertTitle mr={2}>{props.title}!</AlertTitle>
      <AlertDescription fontWeigh="500">{props.desc}</AlertDescription>
    </Alert>
  );
};

export default Error;
