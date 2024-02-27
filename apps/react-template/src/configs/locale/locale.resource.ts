import loginEnTranslation from '../../pages/login/translations/en.translation.json';
import loginIdTranslation from '../../pages/login/translations/id.translation.json';
import loginJaTranslation from '../../pages/login/translations/ja.translation.json';
import mainEnTranslation from '../../pages/main/translations/en.translation.json';
import mainIdTranslation from '../../pages/main/translations/id.translation.json';
import mainJaTranslation from '../../pages/main/translations/ja.translation.json';
import routeMap from '../route/route-map.config';

import { Languages } from './locale.config';

/**
 * This is used only for resource typing, not actually adding resources
 */
const resources = {
  [Languages.EN]: {
    [routeMap.login]: loginEnTranslation,
    [routeMap.main]: mainEnTranslation,
  },
  [Languages.ID]: {
    [routeMap.login]: loginIdTranslation,
    [routeMap.main]: mainIdTranslation,
  },
  [Languages.JA]: {
    [routeMap.login]: loginJaTranslation,
    [routeMap.main]: mainJaTranslation,
  },
} as const;

/**
 * For multiple languages, use `&` to intersect the types
 */
export type LanguageResource = (typeof resources)[Languages.EN] &
  (typeof resources)[Languages.ID] &
  (typeof resources)[Languages.JA];
