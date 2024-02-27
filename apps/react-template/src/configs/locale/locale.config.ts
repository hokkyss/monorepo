import type { Namespace } from 'i18next';

import { createInstance } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';

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
  ns: Object.keys(routeMap),
  resources: {},
  returnNull: false,
});

i18n.init();

const getT = <NS extends Namespace>(language: string, ns: NS) => i18n.getFixedT(language, ns);

// #region UTILITY HOOKS
export function useTranslation<NS extends Namespace>(ns: NS) {
  const [lang, setLang] = useState(i18n.language);
  const [ready, setReady] = useState(i18n.isInitialized);

  const tFunc = useMemo(() => getT(lang, ns), [lang, ns]);

  useEffect(() => {
    const changeReady = () => setReady(true);

    i18n.on('initialized', changeReady);

    return () => i18n.off('initialized', changeReady);
  }, []);

  const handleLanguageChange = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  }, []);

  if (!ready) {
    throw new Promise<void>((resolve) => {
      i18n.init(() => resolve());
    });
  }

  return [tFunc, handleLanguageChange] as const;
}
// #endregion
