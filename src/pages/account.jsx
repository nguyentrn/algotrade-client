import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import App from '../layouts/App';
const Account = dynamic(() => import('../features/account'), {
  ssr: false,
});

const WalletPage = () => {
  return (
    <App>
      <Account />
    </App>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['trade', 'common'])),
  },
});

export default WalletPage;
