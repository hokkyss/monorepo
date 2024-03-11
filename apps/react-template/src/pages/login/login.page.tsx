import { Languages, i18n } from '../../configs/locale/locale.config';
import routeMap from '../../configs/route/route-map.config';
import { useTranslation } from '../main/hooks/use-translation/use-translation.hook';

import enTranslation from './translations/en.translation.json';
import idTranslation from './translations/id.translation.json';
import jaTranslation from './translations/ja.translation.json';

i18n.init(() => {
  i18n
    .addResourceBundle(Languages.EN, routeMap.login, enTranslation)
    .addResourceBundle(Languages.ID, routeMap.login, idTranslation)
    .addResourceBundle(Languages.JA, routeMap.login, jaTranslation);
});

export default function LoginPage() {
  const [t] = useTranslation({
    namespace: routeMap.login,
  });

  return <div>{t('login')}</div>;
}
