import { createInstance } from 'i18next';

import envConfig from '../env/env.config';
import routeMap from '../route/route-map.config';

export enum Languages {
  EN = 'en',
  ID = 'id',
  JA = 'ja',
}

export const i18n = createInstance({
  debug: envConfig.env === 'development',
  fallbackLng: Languages.EN,
  fallbackNS: false,
  lng: Languages.EN,
  ns: Object.values(routeMap),
  resources: {},
  returnNull: false,
});
