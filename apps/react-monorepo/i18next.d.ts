import 'i18next';

import type { LanguageResource } from './src/configs/locale/locale.config';
import type { RouteName } from './src/configs/route-map/route-map.config';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: RouteName;
    fallbackNS: false;
    ns: RouteName[];
    resources: LanguageResource;
    returnNull: false;
  }
}
