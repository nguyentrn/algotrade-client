import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCookie } from 'react-use';
import { useSession } from 'next-auth/react';

import { initTradingPairs } from '../redux/marketSlice';
import { getUser, setToken } from '../redux/authSlice';

const useLogin = () => {
  const { data: session } = useSession();
  const [token] = useCookie('next-auth.session-token');
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
      dispatch(initTradingPairs());
    }
  }, []);

  return session;
};

export default useLogin;
