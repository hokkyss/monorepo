import type {
  CLSReportCallback,
  FCPReportCallback,
  FIDReportCallback,
  LCPReportCallback,
  MetricType,
  TTFBReportCallback,
} from 'web-vitals';

import isFunction from 'lodash/isFunction';

import envConfig from '../../configs/env/env.config';

type ReportCallback =
  | ((metric: MetricType) => void)
  | {
      onCLS: CLSReportCallback;
      onFCP: FCPReportCallback;
      onFID: FIDReportCallback;
      onLCP: LCPReportCallback;
      onTTFB: TTFBReportCallback;
    };

/**
 * Report web vitals
 * @dev
 * @param onEntry Executed callback when a metric has been calculated
 */
const reportWebVitals = async (onEntry: ReportCallback) => {
  if (envConfig.env !== 'development') {
    return;
  }

  const { onCLS, onFCP, onFID, onLCP, onTTFB } = await import('web-vitals');

  if (isFunction(onEntry)) {
    onCLS(onEntry);
    onFID(onEntry);
    onFCP(onEntry);
    onLCP(onEntry);
    onTTFB(onEntry);

    return;
  }

  onCLS(onEntry.onCLS);
  onFID(onEntry.onFID);
  onFCP(onEntry.onFCP);
  onLCP(onEntry.onLCP);
  onTTFB(onEntry.onTTFB);
};

export default reportWebVitals;
