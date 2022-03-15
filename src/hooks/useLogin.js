import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCookie } from 'react-use';
import { useSession } from 'next-auth/react';

import { setToken, login } from '../redux/authSlice';
import { fetchAccount } from '../redux/accountSlice';
import { initTradingPairs } from '../redux/marketSlice';

const useLogin = () => {
  const { data: session } = useSession();
  const [token] = useCookie('next-auth.session-token');
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
      dispatch(login());
      dispatch(initTradingPairs());
      dispatch(fetchAccount());
    }
  }, []);

  return session;
};

export default useLogin;
