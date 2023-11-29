import type { Namespace } from 'i18next';

import { createInstance } from 'i18next';
import { useEffect, useState } from 'react';

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

i18n.init();

const getT = <NS extends Namespace>(language: string, ns: NS) => i18n.getFixedT(language, ns as NS);

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
    const changeTFunction = (lng: string) => setT(getT(lng, ns));

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
