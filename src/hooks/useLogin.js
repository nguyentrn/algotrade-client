import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCookie } from 'react-use';
import { useSession } from 'next-auth/react';

import { setToken } from '../redux/authSlice';
import { getAccount } from '../redux/accountSlice';
import { initTradingPairs } from '../redux/marketSlice';

const useLogin = () => {
  const { data: session } = useSession();
  const [token] = useCookie('next-auth.session-token');
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
      dispatch(getAccount());
      dispatch(initTradingPairs());
    }
  }, []);

  return session;
};

export default useLogin;
