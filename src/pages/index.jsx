import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import App from '../layouts/App';
const Dashboard = dynamic(() => import('../features/dashboard'), {
  ssr: false,
});

const DashboardPage = () => {
  return (
    <App>
      <Dashboard />
    </App>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['trade', 'common'])),
  },
});

export default DashboardPage;
