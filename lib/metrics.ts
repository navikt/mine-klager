import { sendAmplitudeEvent } from '@/lib/amplitude/send';
import type { AmplitudeContextData } from '@/lib/amplitude/types';
import { pushEvent } from '@/lib/observability';

export const sendMetricEvent = (
  eventName: string,
  domain: string,
  context: AmplitudeContextData & Record<string, string>,
) => {
  pushEvent(eventName, domain, context);
  sendAmplitudeEvent(eventName, domain, context);
};
