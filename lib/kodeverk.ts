import { trace } from '@opentelemetry/api';
import { cache } from 'react';
import { isDeployed } from '@/lib/environment';
import { InternalServerError } from '@/lib/errors';
import { getLogger } from '@/lib/logger';
import { recordSpanError } from '@/lib/tracing';
import type { Language } from '@/locales';

const logger = getLogger('kodeverk');
const tracer = trace.getTracer('mine-klager');

const API_URL = isDeployed
  ? 'http://klage-kodeverk-api/kodeverk'
  : 'https://klage-kodeverk-api.intern.dev.nav.no/kodeverk';

interface Ytelse {
  id: string;
  navn: string;
}

export const getYtelseName = cache(async (innsendingsytelseId: string, lang: Language): Promise<string> => {
  const response = await getYtelser(lang);

  return response.find((ytelse) => ytelse.id === innsendingsytelseId)?.navn ?? innsendingsytelseId;
});

/**
 * Cached per request, so a case list fetches and logs failures once, not once per case.
 * The response is also cached across requests, since ytelser rarely change. Next only caches status 200.
 */
const getYtelser = cache(async (lang: Language): Promise<Ytelse[]> => {
  const url = `${API_URL}/innsendingsytelser/${lang}`;

  return tracer.startActiveSpan(`getYtelser ${url}`, async (span) => {
    try {
      span.setAttribute('kodeverk.lang', lang);

      const res = await fetch(url, {
        headers: { accept: 'application/json' },
        next: { revalidate: YTELSER_CACHE_TTL },
      });

      if (!res.ok) {
        const body = await res.text();

        logger.error(`Kodeverk responded with status ${res.status} when fetching ytelser`, {
          status: res.status,
          statusText: res.statusText,
          body,
        });

        throw new InternalServerError(res.status, `${FAILED_TO_FETCH}: ${body}`);
      }

      // `return await`, so parse errors are caught here.
      return await res.json();
    } catch (error) {
      recordSpanError(span, error);

      if (error instanceof InternalServerError) {
        throw error;
      }

      logger.error('Failed to fetch kodeverk', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      throw new InternalServerError(500, FAILED_TO_FETCH, {
        cause: error instanceof Error ? error : undefined,
      });
    } finally {
      span.end();
    }
  });
});

const FAILED_TO_FETCH = 'Failed to fetch ytelser from kodeverk';

/*
 * Revalidate every hour (60 minutes * 60 seconds). Next serves the cached response and refreshes it in the background,
 * keeping the old response if the refresh fails. So the interval only affects freshness, not latency or resilience.
 */
const YTELSER_CACHE_TTL = 60 * 60;
