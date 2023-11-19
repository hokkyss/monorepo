import type {
  CLSReportCallback,
  FCPReportCallback,
  FIDReportCallback,
  LCPReportCallback,
  MetricType,
  TTFBReportCallback,
} from 'web-vitals';

import isFunction from 'lodash/isFunction';
import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';

type ReportCallback =
  | ((metric: MetricType) => void)
  | {
      onCLS: CLSReportCallback;
      onFCP: FCPReportCallback;
      onFID: FIDReportCallback;
      onLCP: LCPReportCallback;
      onTTFB: TTFBReportCallback;
    };

const reportWebVitals = (onEntry: ReportCallback) => {
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
