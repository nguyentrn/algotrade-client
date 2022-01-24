import { Text, Flex, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import NumberInput from '../../../../components/NumberInput';
import useLocalization from '../../../../hooks/useLocalization';
import { advancedStrategyProps } from '../../constant/tradingPairDetail';
import { updateStrategy } from '../../../../redux/marketSlice';

const StrategyForm = ({ onClose, tradingPair }) => {
  const t = useLocalization('common');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    shouldUnregister: true,
  });

  const onSubmit = async (data) => {
    dispatch(updateStrategy({ symbol: tradingPair.symbol, advanceSettings: data }));
    onClose();
  };

  return (
    <Flex as="form" flexDir="column" onSubmit={handleSubmit(onSubmit)} px="8" py="4">
      <Flex flexDir="column" mt="2">
        {advancedStrategyProps[tradingPair.strategy].map((prop) => (
          <Flex justify="space-between" align="center" key={prop.prop}>
            <Text fontSize="sm">{t(prop.prop)}</Text>
            <NumberInput
              w="24"
              size="sm"
              pattern=".*"
              defaultValue={tradingPair?.advanceSettings?.[prop.prop]}
              register={{ ...register(prop.prop, { valueAsNumber: true }) }}
              {...prop}
            />
          </Flex>
        ))}
      </Flex>
      <Button type="submit" m="auto" mt="4" px="10">
        Lưu
      </Button>
    </Flex>
  );
};

export default StrategyForm;
