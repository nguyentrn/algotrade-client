import { Flex, Icon, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  RiWallet3Line,
  RiHome3Line,
  RiCurrencyLine,
  RiLineChartLine,
  RiTeamLine,
  RiSecurePaymentLine,
  RiAccountBoxLine,
} from 'react-icons/ri';
import { FaPeopleCarry } from 'react-icons/fa';

import useLocalization from '../../hooks/useLocalization';

const Sidebar = () => {
  const router = useRouter();
  const pathname = router.pathname.match(/^\/(\w*|\-)*/gi)[0];
  const t = useLocalization('common');

  const sidebarItems = [
    { url: '/', label: t('home-page'), icon: RiHome3Line },
    { url: '', label: t('account'), icon: RiAccountBoxLine },
    { url: '/trading-pair', label: t('trading-pair'), icon: RiCurrencyLine },
    { url: '/wallet', label: t('wallet'), icon: RiWallet3Line },
    { url: '/backtest', label: t('backtest'), icon: RiLineChartLine },
    { url: '', label: t('security'), icon: RiSecurePaymentLine },
    { url: '', label: t('team'), icon: RiTeamLine },
    { url: '', label: t('referer'), icon: FaPeopleCarry },
  ];

  return (
    <Flex
      flexDir="column"
      minW="60"
      maxW="60"
      h="100vh"
      position="sticky"
      top="0"
      bottom="0"
      alignSelf="flex-start"
      align="center"
      pt="5"
    >
      <Image src="https://wabes.ca/wp-content/uploads/2019/05/4.png" alt="logo" w="90%" py="10" />
      <Flex flexDir="column" w="100%">
        {sidebarItems.map(({ url, label, icon }) => (
          <Link key={label} href={url} passHref>
            <Flex
              key={url}
              cursor="pointer"
              p="4"
              bg={pathname === url ? 'primary.800' : ''}
              color={pathname === url ? 'primary.100' : ''}
              w="100%"
              alignItems="center"
              fontWeight="600"
            >
              <Icon as={icon} fontSize="2xl" mr="2" />
              <Text fontSize="sm" color={url === '' && 'blackAlpha.400'}>
                {label}
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
