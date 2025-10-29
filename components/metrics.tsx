'use client';

import { type MetricEventData, type MetricsContextData, useSendMetricEvent } from '@/lib/metrics';

interface MetricEventProps {
  eventName?: string;
  /* The domain of the event. Used by Grafana. */
  domain: string;
  context: MetricsContextData;
  eventData?: MetricEventData;
}

export const MetricEvent = ({ eventName = 'besøk', domain, eventData, context }: MetricEventProps) => {
  useSendMetricEvent(eventName, domain, { ...context, ...eventData });

  return null;
};
