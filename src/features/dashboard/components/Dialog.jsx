import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useLocalization from '../../../hooks/useLocalization';
import { toggleActiveTradingPair } from '../../../redux/marketSlice';

const Dialog = ({ tradingPair }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();
  const dispatch = useDispatch();
  const tTrade = useLocalization('trade');
  const tCommon = useLocalization('common');
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const handleActive = () => {
    const { symbol, isActive, initAmount, takeProfit } = tradingPair;
    onClose();
    dispatch(toggleActiveTradingPair({ symbol, isActive: !isActive, initAmount, takeProfit }));
  };

  return (
    <>
      <Button
        onClick={tradingPair.isActive ? onOpen : handleActive}
        variant={tradingPair.isActive ? 'solid' : 'outline'}
        w="24"
      >
        {tradingPair.isActive ? tTrade('stop-trade') : tTrade('start-trade')}
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {tTrade('stop-trade')}
            </AlertDialogHeader>

            <AlertDialogBody>{tTrade('stop-trade-alert')}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {tCommon('cancel')}
              </Button>
              <Button colorScheme="red" variant="outline" onClick={handleActive} ml={3}>
                {tTrade('stop-trade')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Dialog;
