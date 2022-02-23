import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';

import { getBalances, checkApiEnabled, selectIsApiEnabled } from '../redux/accountSlice';

const useAccountInfo = () => {
  const data = useSession();
  const dispatch = useDispatch();
  const isApiEnabled = useSelector(selectIsApiEnabled);
  useEffect(() => {
    console.log(isApiEnabled);
    if (data.status === 'authenticated' && isApiEnabled === undefined) {
      dispatch(checkApiEnabled());
    }
  }, [data?.status, dispatch, isApiEnabled]);

  useEffect(() => {
    if (!isApiEnabled) {
      dispatch(getBalances());
    }
  }, [dispatch, isApiEnabled]);

  return data;
};

export default useAccountInfo;
