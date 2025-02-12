'use client';

import { grafana } from '@/lib/observability';
import { getCurrentConsent } from '@navikt/nav-dekoratoren-moduler';
import { useEffect } from 'react';

export const Faro = () => {
  useEffect(() => {
    grafana.initialize();

    setTimeout(() => {
      // Calling getCurrentConsent() too early will return undefined.
      const { consent } = getCurrentConsent();

      if (consent.analytics) {
        grafana.unpause();
      }
    }, 100);
  }, []);

  return null;
};
