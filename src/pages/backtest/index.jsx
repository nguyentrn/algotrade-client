import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import App from '../../layouts/App';
const Backtest = dynamic(() => import('../../features/backtest'), {
  ssr: false,
});

const BacktestPage = (locale) => {
  return (
    <App>
      <Backtest />
    </App>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['trade', 'common'])),
  },
});

export default BacktestPage;
