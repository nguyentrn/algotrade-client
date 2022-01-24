import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Flex, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import useLocalization from '../../hooks/useLocalization.js';
import { useEffect, useState } from 'react';

const LocaleSelector = () => {
  const [language, setLanguage] = useState('vi');
  const router = useRouter();
  const { locale, asPath } = router;
  const handlePush = () => {
    router.push('/', '/', { locale: language });
    setTimeout(() => {
      window.open(`/${language}/${asPath}`, '_self');
    }, 0);
  };

  useEffect(() => {
    setLanguage(locale === 'en' ? 'vi' : 'en');
  }, [locale]);

  return (
    <Flex
      cursor="pointer"
      onClick={handlePush}
      border="1px"
      borderColor="primaryAlpha.900"
      borderRadius="md"
      px="2"
      mx="2"
    >
      {locale.toUpperCase()}
    </Flex>
  );
};

export default function Header() {
  const { data: session } = useSession();
  const t = useLocalization('common');

  const handleSignIn = () => {
    signIn('google');
  };

  const handleSignOut = () => {
    signOut('google');
  };

  return (
    <Flex as="header" minH="20" maxH="20" align="center" justify="flex-end" color="blackAlpha.900" px="4">
      <Flex align="center">
        {!session && (
          <>
            <LocaleSelector />
            <Button size="sm" colorScheme="primary" onClick={handleSignIn}>
              {t('sign-in')}
            </Button>
          </>
        )}
        {session && (
          <>
            <Text fontWeight="600" fontSize="xs" mx="1">
              {session.user.email || session.user.name}
            </Text>
            {/* <Link href="/profile" passHref mx="1">
              <Button size="sm" colorScheme="green">
                Tài khoản
              </Button>
            </Link> */}
            <LocaleSelector />
            <Button mx="1" size="sm" colorScheme="primary" onClick={handleSignOut}>
              {t('sign-out')}
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
}
