import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import App from '../../../layouts/App';
const TradingPair = dynamic(() => import('../../../features/tradingPair'), {
  ssr: false,
});

const TradingPairPage = () => {
  const router = useRouter();
  const { symbol } = router.query;

  return (
    <App>
      <TradingPair symbol={symbol} />
    </App>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['trade', 'common'])),
  },
});

export default TradingPairPage;
