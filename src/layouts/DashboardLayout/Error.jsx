import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import StyledError from '../../components/Alert/Error';

import { selectIsApiEnabled } from '../../redux/accountSlice';

const Error = () => {
  const isApiEnabled = useSelector(selectIsApiEnabled);
  if (isApiEnabled === false) {
    return (
      <StyledError
        title="Kết nối Sàn giao dịch thất bại"
        desc={
          <Text>
            Vui lòng kiểm tra API tại <Link href="/account">trang cá nhân</Link>
          </Text>
        }
        my="4"
      />
    );
  }
  return null;
};

export default Error;
