import { getAmplitudeInstance } from '@navikt/nav-dekoratoren-moduler';
import type { AmplitudeContextData } from '@/lib/amplitude/types';
import { VERSION } from '@/lib/version';

export const amplitude = getAmplitudeInstance('mine-klager');

export const sendAmplitudeEvent = (eventName: string, domain: string, context: AmplitudeContextData) =>
  amplitude(eventName, { ...context, domain, version: VERSION });
