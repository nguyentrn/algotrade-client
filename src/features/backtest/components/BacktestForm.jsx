import { useState, useEffect } from 'react';
import { Text, Flex, Button, Select, FormControl, FormLabel, Divider, Heading } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';

import DCAInput from '../../tradingPair/sections/DCA/DCAInput';
import { selectTradingPairs } from '../../../redux/marketSlice';
import NumberInput from '../../../components/NumberInput';
import { advancedStrategyProps, fundManagementProps } from '../../tradingPair/constant/tradingPairDetail';
import useLocalization from '../../../hooks/useLocalization';
import defaultSettings from '../../tradingPair/constant/defaultTradingSettings';
import createEntryPointInputs from '../../tradingPair/sections/DCA/createEntryPointInputs';

const SettingHeading = (props) => {
  return <Text fontWeight="700" color="primary.600" my="2" {...props} />;
};

const BacktestForm = ({ fetchData }) => {
  const tradingPairs = useSelector(selectTradingPairs);
  const methods = useForm({
    shouldUnregister: true,
  });
  const t = useLocalization('common');
  const [entryPointInputs, setEntryPointInputs] = useState();

  const handleChangeNumberOfPosition = (val) => {
    setEntryPointInputs(createEntryPointInputs(defaultSettings.entryPoints, val * 1));
  };
  useEffect(() => {
    setEntryPointInputs(createEntryPointInputs(defaultSettings.entryPoints));
  }, []);

  const onSubmit = async (data) => {
    data.strategy = 'simple-dca';
    if (!data.symbol) {
      console.log(data);
      data.symbol = 'BTCUSDT';
    }
    if (!data.entryPoints) {
      data.isDCA = false;
      data.entryPoints = [];
    } else {
      data.isDCA = true;
    }
    fetchData(data);
  };

  useEffect(() => {
    fetchData({
      symbol: 'BTCUSDT',
      isDCA: true,
      strategy: 'simple-dca',
      backtestLength: 600,
      ...defaultSettings,
    });
  }, []);

  return (
    <>
      <Heading fontSize="xl" fontWeight="500" my="4">
        Thiết đặt lệnh
      </Heading>
      <FormProvider {...methods}>
        <Flex as="form" flexDir="column" onSubmit={methods.handleSubmit(onSubmit)} px="8" py="4" m="auto" w="80%">
          <SettingHeading>Tiền điện tử</SettingHeading>
          <Select {...methods.register('symbol')}>
            {tradingPairs.map(({ symbol }) => (
              <option key={symbol} value={symbol} register={{ ...methods.register('symbol') }}>
                {symbol}
              </option>
            ))}
          </Select>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm">{t('backtest-length')}</Text>
            <NumberInput
              w="24"
              size="sm"
              pattern=".*"
              defaultValue={1440}
              register={{ ...methods.register('backtestLength', { valueAsNumber: true }) }}
            />
          </Flex>

          <Divider />
          <SettingHeading>{t('fund-management')}</SettingHeading>
          {fundManagementProps.map((prop) => (
            <Flex justify="space-between" align="center" key={prop.prop}>
              <Text fontSize="sm">{t(prop.prop)}</Text>
              <NumberInput
                w="24"
                size="sm"
                pattern=".*"
                defaultValue={defaultSettings[prop.prop]}
                register={{ ...methods.register(prop.prop, { valueAsNumber: true }) }}
                {...prop}
              />
            </Flex>
          ))}
          <Divider />
          <SettingHeading>{t('advanced-strategy')}</SettingHeading>
          {advancedStrategyProps['simple-dca'].map((prop) => (
            <Flex justify="space-between" align="center" key={prop.prop}>
              <Text fontSize="sm">{t(prop.prop)}</Text>
              <NumberInput
                w="24"
                size="sm"
                pattern=".*"
                defaultValue={defaultSettings.advanceSettings?.[prop.prop]}
                register={{ ...methods.register(`advanceSettings.${prop.prop}`, { valueAsNumber: true }) }}
                {...prop}
              />
            </Flex>
          ))}
          <Divider />
          <SettingHeading>{t('dca')}</SettingHeading>
          <FormControl px="4" display="flex">
            <FormLabel w="100%" alignSelf="center">
              Số lần vào vị thế:
            </FormLabel>
            <NumberInput
              w="40"
              step={1}
              defaultValue={defaultSettings.entryPoints.length}
              min={0}
              max={10}
              onChange={handleChangeNumberOfPosition}
              register={{ readOnly: true }}
            />
          </FormControl>
          <Flex
            borderBottom="1px"
            borderColor="blackAlpha.200"
            color="blackAlpha.500"
            fontWeight="600"
            fontSize="xs"
            py="1"
          >
            <Text w="100%">Lệnh thứ</Text>
            <Text w="40" textAlign="center">
              Vị thế
            </Text>
            <Text w="40" textAlign="center">
              Vốn
            </Text>
          </Flex>

          <Flex flexDir="column" mt="2">
            {entryPointInputs?.map((entryPointInput, id) => (
              <DCAInput key={id} entryPointInput={entryPointInput} id={id} />
            ))}
          </Flex>

          <Button type="submit" m="auto" mt="4" px="10">
            Giả lập
          </Button>
        </Flex>
      </FormProvider>
    </>
  );
};

export default BacktestForm;
