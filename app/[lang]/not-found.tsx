import { DecoratorUpdater } from '@/components/decorator-updater';
import { getCurrentPath } from '@/lib/current-path';
import { getLanguageFromHeaders } from '@/lib/get-language';
import { Languages, type Translation } from '@/locales';
import { BodyShort, Heading } from '@navikt/ds-react';
import { headers } from 'next/headers';
import NextLink from 'next/link';

export default async function NotFound() {
  const path = await getCurrentPath();
  const lang = getLanguageFromHeaders(await headers());

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
        {HEADING[lang]}
      </Heading>

      <BodyShort spacing>
        <NextLink href="/">{BODY[lang]}</NextLink>
      </BodyShort>
    </>
  );
}

const HEADING: Translation = {
  [Languages.NB]: 'Fant ikke siden',
  [Languages.NN]: 'Fant ikkje sida',
  [Languages.EN]: 'Page not found',
};

const BODY: Translation = {
  [Languages.NB]: 'Gå til «Mine klager og anker hos Nav klageinstans».',
  [Languages.NN]: 'Gå til «Mine klagar og ankar hos Nav klageinstans».',
  [Languages.EN]: 'Go to «My complaints and appeals with Nav Complaints Unit (Nav klageinstans)».',
};
