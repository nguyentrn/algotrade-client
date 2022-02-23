import { Button, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useLocalization from '../../../hooks/useLocalization';
import getTokenAlphaColor from '../../../utils/getTokenAlphaColor';
import DescriptionItem from '../components/DescriptionItem';

const Description = ({ tradingPair }) => {
  const t = useLocalization('common');
  const { asPath } = useRouter();

  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      align="center"
      justify="space-between"
      my="4"
      bg={tradingPair.color ? getTokenAlphaColor(tradingPair.color) : 'primaryAlpha.200'}
      p="4"
      borderRadius="md"
      boxShadow="sm"
    >
      <Flex align="center">
        <Image
          src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${tradingPair.id}.png`}
          alt={`${tradingPair.name} logo`}
          w="64px"
        />

        <Flex flexDir="column">
          <Text as="h2" ml="4" fontSize="2xl">
            {tradingPair.name}
          </Text>
          <Text ml="4" fontSize="sm">
            {tradingPair.c ? tradingPair.c : t('loading')}
          </Text>
        </Flex>
      </Flex>
      <DescriptionItem
        label={t('status')}
        data={tradingPair.isActive ? t('activating') : t('inactive')}
        color={tradingPair.isActive ? 'green.500' : 'yellow.500'}
      />
      <DescriptionItem label={t('strategy')} data={t('dca')} />
      <DescriptionItem label={t('number-of-position')} data={`x${tradingPair.entryPoints.length}`} />

      <Link href={`${asPath}/orders`} passHref>
        <Button isDisabled>{t('order-detail')}</Button>
      </Link>
    </Flex>
  );
};

export default Description;
