'use client';

import { useEffect } from 'react';
import { grafana } from '@/lib/observability';
import type { Language } from '@/locales';

export type MetricEventData = Record<string, string | number | boolean | undefined | null>;

export interface MetricsContextData {
  lang?: Language;
  path?: string;
  page?: string;
  ytelse?: string;
  type?: string;
}

export const sendMetricEvent = async (
  eventName: string,
  domain: string,
  context: MetricsContextData & Record<string, string>,
) => {
  try {
    grafana.pushEvent(eventName, domain, context);
  } catch (error) {
    console.error('Failed to send metric event to Grafana', error);
  }
};

export const useSendMetricEvent = (
  eventName: string,
  domain: string,
  context: MetricsContextData & Record<string, string>,
) => {
  useEffect(() => {
    setTimeout(() => {
      sendMetricEvent(eventName, domain, { ...context, referrer: document.referrer });
    }, 100);
  }, [eventName, context, domain]);
};
