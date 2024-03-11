import type { FlatNamespace } from 'i18next';

import type { Languages } from '../../../../configs/locale/locale.config';

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';

import { i18n } from '../../../../configs/locale/locale.config';

/**
 * Get i18n translation function for the specified `language` and `namespace`.
 * @param language
 * @param namespace
 * @returns
 */
function getT<NS extends FlatNamespace>(language: string, namespace: NS) {
  return i18n.getFixedT(language, namespace);
}

type UseTranslationProps<NS extends FlatNamespace> = {
  namespace: NS;
  useSuspense?: boolean;
};

type UseTranslationReturn<NS extends FlatNamespace> = [
  t: ReturnType<typeof getT<NS>>,
  setLang: (lang: Languages) => void,
];

export function useTranslation<NS extends FlatNamespace>(props: UseTranslationProps<NS>): UseTranslationReturn<NS> {
  const { namespace, useSuspense = false } = props;

  const [lang, setLang] = useState(i18n.language);

  const tFunc = useMemo(() => getT(lang, namespace), [lang, namespace]);

  const ready = useSyncExternalStore(
    (callback) => {
      i18n.on('initialized', callback);

      return () => i18n.off('initialized', callback);
    },
    () => i18n.isInitialized,
  );

  const handleLanguageChange = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
    setLang(lng);
  }, []);

  if (useSuspense && !ready) {
    throw new Promise<void>((resolve) => {
      i18n.init(() => resolve());
    });
  }

  return [tFunc, handleLanguageChange];
}
// #endregion
