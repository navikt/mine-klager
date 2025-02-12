import type { AmplitudeContextData } from '@/lib/amplitude/types';
import { sendMetricEvent } from '@/lib/metrics';
import { useEffect } from 'react';

export const useSendMetricEvent = (
  eventName: string,
  domain: string,
  context: AmplitudeContextData & Record<string, string>,
) => {
  useEffect(() => {
    setTimeout(() => {
      sendMetricEvent(eventName, domain, context);
    }, 100);
  }, [eventName, context, domain]);
};
