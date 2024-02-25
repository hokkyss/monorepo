import React from 'react';
import * as ReactDOM from 'react-dom/client';

import envConfig from '../../configs/env/env.config';

/**
 * Happens only in DEVELOPMENT
 */
const reportAccessibility = async (): Promise<void> => {
  if (envConfig.env !== 'development') {
    return;
  }

  const [axe] = await Promise.all([(await import('@axe-core/react')).default]);
  await axe(React, ReactDOM, 500);
};

export default reportAccessibility;
