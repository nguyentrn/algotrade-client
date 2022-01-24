import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import App from '../layouts/App';
const Wallet = dynamic(() => import('../features/wallet'), {
  ssr: false,
});

const WalletPage = () => {
  return (
    <App>
      <Wallet />
    </App>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['trade', 'common'])),
  },
});

export default WalletPage;
