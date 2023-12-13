import type { Namespace } from 'i18next';

import { createInstance } from 'i18next';
import { useEffect, useState } from 'react';

import loginEnTranslation from '../../pages/login/translations/en.translation.json';
import loginIdTranslation from '../../pages/login/translations/id.translation.json';
import loginJaTranslation from '../../pages/login/translations/ja.translation.json';
import mainEnTranslation from '../../pages/main/translations/en.translation.json';
import mainIdTranslation from '../../pages/main/translations/id.translation.json';
import mainJaTranslation from '../../pages/main/translations/ja.translation.json';
import routeMap from '../route-map/route-map.config';

export enum Languages {
  EN = 'en',
  ID = 'id',
  JA = 'ja',
}

const resources = {
  [Languages.EN]: {
    login: loginEnTranslation,
    main: mainEnTranslation,
  },
  [Languages.ID]: {
    login: loginIdTranslation,
    main: mainIdTranslation,
  },
  [Languages.JA]: {
    login: loginJaTranslation,
    main: mainJaTranslation,
  },
} as const;

/**
 * For multiple languages, use `&` to intersect the types
 */
export type LanguageResource = (typeof resources)[Languages.EN] &
  (typeof resources)[Languages.ID] &
  (typeof resources)[Languages.JA];

export type RouteName = keyof LanguageResource;

export const i18n = createInstance({
  debug: __DEV__,
  fallbackLng: Languages.EN,
  fallbackNS: false,
  lng: Languages.EN,
  ns: Object.keys(routeMap),
  resources,
  returnNull: false,
});

// i18n.init();

const getT = <NS extends Namespace>(language: string, ns: NS) => i18n.getFixedT(language, ns);

// #region UTILITY HOOKS
export function useTranslation<NS extends Namespace>(ns: NS) {
  const [t, setT] = useState(() => getT<NS>(i18n.language, ns));
  const [ready, setReady] = useState(i18n.isInitialized);

  useEffect(() => {
    const changeReady = () => setReady(true);

    i18n.on('initialized', changeReady);

    return () => i18n.off('initialized', changeReady);
  }, []);

  useEffect(() => {
    const changeTFunction = (lng: string) => setT(() => getT(lng, ns));

    i18n.on('languageChanged', changeTFunction);

    return () => i18n.off('languageChanged', changeTFunction);
  }, [ns]);

  if (!ready) {
    throw new Promise<void>((resolve) => {
      i18n.init(() => resolve());
    });
  }

  return t;
}
// #endregion
