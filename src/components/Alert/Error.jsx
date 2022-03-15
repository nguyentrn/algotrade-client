import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

const Error = (props) => {
  return (
    <Alert status="error" fontSize="sm" {...props}>
      <AlertIcon />
      <AlertTitle mr={2}>{props.title}!</AlertTitle>
      <AlertDescription fontWeight="500">{props.detail}</AlertDescription>
    </Alert>
  );
};

export default Error;
