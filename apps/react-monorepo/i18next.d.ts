import 'i18next';

import type { LanguageResource, RouteName } from './src/configs/locale/locale.config';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: RouteName;
    fallbackNS: false;
    ns: RouteName[];
    resources: LanguageResource;
    returnNull: false;
  }
}
