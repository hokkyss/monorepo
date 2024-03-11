import type { AxeResults } from 'axe-core';

import React from 'react';
import * as ReactDOM from 'react-dom/client';

import envConfig from '../../configs/env/env.config';

/**
 * Accessibility report using `@axe-core/react`
 * @dev
 */
const reportAccessibility = async (logger: (results: AxeResults) => void): Promise<void> => {
  if (envConfig.env !== 'development') {
    return;
  }

  const [axe] = await Promise.all([(await import('@axe-core/react')).default]);
  await axe(React, ReactDOM, 500, undefined, undefined, logger);
};

export default reportAccessibility;
