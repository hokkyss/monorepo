import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

import mainEnTranslation from '../../pages/main/translations/en.translation.json';
import routeMap from '../route-map/route-map.config';

export enum Languages {
  EN = 'en',
}

const resources = {
  [Languages.EN]: {
    main: mainEnTranslation,
  },
} as const;

/**
 * For multiple languages, use `&` to intersect the types
 */
export type LanguageResource = (typeof resources)[Languages.EN];

export default function initInternationalization() {
  use(initReactI18next).init({
    debug: __DEV__,
    fallbackLng: Languages.EN,
    fallbackNS: false,
    lng: Languages.EN,
    ns: Object.keys(routeMap),
    resources,
    returnNull: false,
  });
}
