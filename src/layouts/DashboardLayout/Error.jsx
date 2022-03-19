import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

import StyledError from '../../components/Alert/Error';
import useAPIError from '../../hooks/useAPIError';

const Error = () => {
  const error = useAPIError();
  if (!error) {
    return (
      <Alert status="success" fontSize="sm">
        <AlertIcon />
        <AlertTitle mr={2}>API hợp lệ!</AlertTitle>
        <AlertDescription fontWeight="500">
          <Text>
            Quý khách có thể giao dịch tại <Link href="trading-pair">Danh mục đầu tư</Link>.
          </Text>
        </AlertDescription>
      </Alert>
    );
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
