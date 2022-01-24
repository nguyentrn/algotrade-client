import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineRight } from 'react-icons/ai';

import useLocalization from '../../hooks/useLocalization';

const getBreadcrumbItems = (path) => {
  const pathComponents = path.split('/');
  const urls = [];

  pathComponents.forEach((pathComponent) => {
    const url = pathComponents.splice(-1, 1);
    urls.unshift(url);
  });
  // const items = path.split('/');
  // const urls = items.map((item) => ({ url: item, label: '', icon: 'RiHome3Line' }));
  return urls;
};

const StyledBreadcrumb = () => {
  const router = useRouter();
  const t = useLocalization('common');
  const breadcrumbItems = getBreadcrumbItems(router.asPath);
  // const BreadcrumbItems = [
  //   { url: '/', label: t('home-page'), icon: RiHome3Line },
  //   { url: '/trading-pair', label: t('trading-pair'), icon: RiCurrencyLine },
  //   { url: '/wallet', label: t('wallet'), icon: RiWallet3Line },
  // ];

  return (
    <Flex m="5">
      <Breadcrumb spacing="8px" separator={<AiOutlineRight color="gray.500" />}>
        {/* {items.map((item) => (
          <BreadcrumbItem fontSize="sm" fontWeight="600" key={item}>
            <BreadcrumbLink as={Link} href="/">
              {item}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))} */}
      </Breadcrumb>
    </Flex>
  );
};

export default StyledBreadcrumb;
