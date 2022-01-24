import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';

import { getBalances, checkApiExpired, selectIsApiExpired } from '../redux/accountSlice';

const useAccountInfo = () => {
  const data = useSession();
  const dispatch = useDispatch();
  const isApiExpired = useSelector(selectIsApiExpired);
  useEffect(() => {
    if (data.status === 'authenticated') {
      dispatch(checkApiExpired());
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!isApiExpired) {
      dispatch(getBalances());
    }
  }, [dispatch, isApiExpired]);

  // return data;
};

export default useAccountInfo;
