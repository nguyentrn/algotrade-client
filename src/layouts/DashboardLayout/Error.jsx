import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import StyledError from '../../components/Alert/Error';
import useAPIError from '../../hooks/useAPIError';

const Error = () => {
  const error = useAPIError();
  console.log(error);
  if (!error) {
    return '';
  }
  return (
    <StyledError
      title={error.title}
      detail={
        <Text>
          {error.detail} <Link href={error.href}>{error.hrefLabel}</Link>
          {error.next || ''}.
        </Text>
      }
      my="4"
    />
  );
};

export default Error;
