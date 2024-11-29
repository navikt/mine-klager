import { DecoratorUpdater } from '@/components/decorator-updater';
import { getCurrentPath } from '@/lib/current-path';
import { Languages } from '@/locales';
import { BodyShort, Heading } from '@navikt/ds-react';
import NextLink from 'next/link';

export default async function NotFound() {
  const path = await getCurrentPath();

  return (
    <>
      <DecoratorUpdater
        lang={Languages.NB}
        path={path}
        breadcrumbs={[
          {
            title: 'Side ikke funnet / Page not found',
            url: path,
          },
        ]}
      />

      <Heading size="medium" level="1" spacing>
        Fant ikke siden
      </Heading>

      <BodyShort spacing>
        <NextLink href="/">Gå til «Mine klager og anker».</NextLink>
      </BodyShort>

      <Heading size="medium" level="1" spacing>
        Page not found
      </Heading>

      <BodyShort spacing>
        <NextLink href="/">Go to «My complaints and appeals».</NextLink>
      </BodyShort>
    </>
  );
}
