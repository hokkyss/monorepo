import { createInstance } from 'i18next';

import envConfig from '../env/env.config';
import routeMap from '../route/route-map.config';

export enum Languages {
  EN = 'en-US',
  ID = 'id-ID',
  JA = 'ja-JP',
}

export const i18n = createInstance({
  debug: envConfig.env === 'development',
  fallbackLng: false,
  fallbackNS: false,
  lng: Languages.EN,
  ns: Object.values(routeMap),
  resources: {},
  returnNull: false,
  supportedLngs: Object.values(Languages),
});
