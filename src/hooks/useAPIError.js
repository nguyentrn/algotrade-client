import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectBalances, selectPermissions } from '../redux/accountSlice';

const useAPIError = () => {
  const permissions = useSelector(selectPermissions);
  const balances = useSelector(selectBalances);
  const [error, setError] = useState();

  useEffect(() => {
    if (!permissions) {
      setError({
        title: 'Quý khách chưa nhập API',
        detail: 'Vui lòng kiểm tra API tại',
        href: '/account',
        hrefLabel: 'trang cá nhân',
        rest: 'và đăng nhập lại',
      });
    } else if (!permissions.enableReading) {
      setError({
        title: 'API không được cấp quyền đọc',
        detail: 'Vui lòng cấp quyền đọc tại',
        href: 'https://www.binance.com/vi/my/settings/api-management',
        hrefLabel: 'trang web của sàn',
        rest: 'và đăng nhập lại',
      });
    } else if (!permissions.enableSpotAndMarginTrading) {
      setError({
        title: 'API không được cấp quyền giao dịch',
        detail: 'Vui lòng cấp quyền giao dịch tại',
        href: 'https://www.binance.com/vi/my/settings/api-management',
        hrefLabel: 'trang web của sàn',
        rest: 'và đăng nhập lại',
      });
    } else if (!balances.USDT) {
      setError({
        title: 'Tài khoản không đủ USDT để giao dịch',
        detail: 'Vui lòng nạp thêm USDT vào tài khoản tại',
        href: 'https://www.binance.com/vi/my/wallet/account/main',
        hrefLabel: 'trang web của sàn',
      });
    } else {
      setError(null);
    }
  }, [permissions, balances]);
  return error;
};

export default useAPIError;
