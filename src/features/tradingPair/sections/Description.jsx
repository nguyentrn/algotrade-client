import { Button, Flex, Image, Text } from '@chakra-ui/react';
import useLocalization from '../../../hooks/useLocalization';
import DescriptionItem from '../components/DescriptionItem';

const Description = ({ tradingPair }) => {
  const t = useLocalization('common');

  return (
    <Flex align="center" justify="space-between" w="100%" my="4" bg="primaryAlpha.100" p="4" borderRadius="xl">
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
      <DescriptionItem label={t('mode')} data={t('single')} />
      <DescriptionItem label={t('strategy')} data={t('dca')} />
      <DescriptionItem label={t('number-of-position')} data={`x${tradingPair.entryPoints.length}`} />
      <Button>{t('order-setting')}</Button>
    </Flex>
  );
};

export default Description;
