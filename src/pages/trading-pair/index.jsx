import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import App from '../../layouts/App';
const TradingPairList = dynamic(() => import('../../features/tradingPairList'), {
  ssr: false,
});

const TradingPairListPage = (locale) => {
  return (
    <App>
      <TradingPairList />
    </App>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['trade', 'common'])),
  },
});

export default TradingPairListPage;
