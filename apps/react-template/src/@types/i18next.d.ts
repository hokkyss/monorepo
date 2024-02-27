/// <reference types="i18next" />

import type { LanguageResource } from '../configs/locale/locale.resource';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: keyof LanguageResource;
    fallbackNS: false;
    ns: (keyof LanguageResource)[];
    resources: LanguageResource;
    returnNull: false;
  }
}
