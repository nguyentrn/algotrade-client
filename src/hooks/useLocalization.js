import { i18n, useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useLocalization = (domain) => {
  const { locale } = useRouter();
  const { t } = useTranslation(domain);

  useEffect(() => {
    i18n.addResourceBundle(locale, domain);
  }, [domain, locale]);

  return t;
};

export default useLocalization;
