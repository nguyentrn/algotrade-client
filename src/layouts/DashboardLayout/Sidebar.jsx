import { Flex, Icon, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef } from 'react';
import { RiWallet3Line, RiHome3Line, RiCurrencyLine, RiLineChartLine, RiAccountBoxLine } from 'react-icons/ri';

import useLocalization from '../../hooks/useLocalization';

const LinkItem = ({ url, pathname, icon, label }) => {
  return (
    <Flex
      // ref={ref}
      as="a"
      key={url}
      cursor="pointer"
      p={{ base: '0', lg: '4' }}
      bg={pathname === url ? 'primary.800' : ''}
      color={pathname === url ? 'primary.100' : 'blackAlpha.900'}
      w="100%"
      align={{ base: 'center', lg: 'initial' }}
      justify={{ base: 'center', lg: 'initial' }}
      fontWeight="600"
    >
      <Flex color={url === '' && 'blackAlpha.400'}>
        <Icon as={icon} fontSize="2xl" />
        <Text ml={2} display={{ base: 'none', lg: 'initial' }} fontSize="sm">
          {label}
        </Text>
      </Flex>
    </Flex>
  );
};

const Sidebar = () => {
  const router = useRouter();
  const pathname = router.pathname.match(/^\/(\w*|\-)*/gi)[0];
  const t = useLocalization('common');

  const sidebarItems = [
    { url: '/', label: t('home-page'), icon: RiHome3Line },
    { url: '/trading-pair', label: t('trading-pair'), icon: RiCurrencyLine },
    { url: '/wallet', label: t('wallet'), icon: RiWallet3Line },
    { url: '/backtest', label: t('backtest'), icon: RiLineChartLine },
    { url: '/account', label: t('account'), icon: RiAccountBoxLine },
    // { url: '', label: t('team'), icon: RiTeamLine },
    // { url: '', label: t('referer'), icon: FaPeopleCarry },
  ];

  return (
    <Flex
      flexDir="column"
      minW={{ base: '100%', lg: '56', xl: '72' }}
      w={{ base: '100%', lg: '56', xl: '72' }}
      h={{ base: '4rem', lg: '100vh' }}
      bg={{ base: 'white', lg: 'initial' }}
      zIndex={{ base: 10, lg: 'initial' }}
      position={{ base: 'fixed', lg: 'sticky' }}
      top={{ lg: '0' }}
      borderTop={{ base: '1px', lg: '0' }}
      borderColor="blackAlpha.100"
      boxShadow={{ base: '2xl', lg: 'initial' }}
      bottom="0"
      left="0"
      right={{ base: '0', lg: 'initial' }}
      alignSelf="flex-start"
      align="center"
      pt={{ base: '0', lg: '5' }}
    >
      <Image
        src="https://wabes.ca/wp-content/uploads/2019/05/4.png"
        display={{ base: 'none', lg: 'initial' }}
        alt="logo"
        w="90%"
        py="10"
      />
      <Flex flexDir={{ base: 'row', lg: 'column' }} w="100%" h={{ base: '4rem', lg: 'initial' }}>
        {sidebarItems.map(({ url, label, icon }) =>
          pathname === url ? (
            <Flex
              as="a"
              key={url}
              cursor="pointer"
              p={{ base: '0', lg: '4' }}
              bg={pathname === url ? 'primary.800' : ''}
              color={pathname === url ? 'primary.100' : 'blackAlpha.900'}
              w="100%"
              align={{ base: 'center', lg: 'initial' }}
              justify={{ base: 'center', lg: 'initial' }}
              fontWeight="600"
            >
              <Flex color={url === '' && 'blackAlpha.400'}>
                <Icon as={icon} fontSize="2xl" />
                <Text ml={2} display={{ base: 'none', lg: 'initial' }} fontSize="sm">
                  {label}
                </Text>
              </Flex>
            </Flex>
          ) : (
            <Link key={label} href={url} passHref>
              <Flex
                as="a"
                key={url}
                cursor="pointer"
                p={{ base: '0', lg: '4' }}
                bg={pathname === url ? 'primary.800' : ''}
                color={pathname === url ? 'primary.100' : 'blackAlpha.900'}
                w="100%"
                align={{ base: 'center', lg: 'initial' }}
                justify={{ base: 'center', lg: 'initial' }}
                fontWeight="600"
              >
                <Flex color={url === '' && 'blackAlpha.400'}>
                  <Icon as={icon} fontSize="2xl" />
                  <Text ml={2} display={{ base: 'none', lg: 'initial' }} fontSize="sm">
                    {label}
                  </Text>
                </Flex>
              </Flex>
            </Link>
          )
        )}
      </Flex>
    </Flex>
  );
};
{
  /* pathname === url ? (
            <LinkItem url={url} pathname={pathname} icon={icon} label={label} />
          ) : ( */
}

{
  /* ) */
}
export default Sidebar;
