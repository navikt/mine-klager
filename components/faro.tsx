'use client';

import { initialize } from '@/lib/observability';
import { getCurrentConsent } from '@navikt/nav-dekoratoren-moduler';
import { useEffect } from 'react';

export const Faro = () => {
  useEffect(() => {
    const faro = initialize();

    setTimeout(() => {
      // Calling getCurrentConsent() too early will return undefined.
      const { consent } = getCurrentConsent();

      if (consent.analytics) {
        faro.unpause();
      }
    }, 100);
  }, []);

  return null;
};
