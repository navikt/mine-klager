import { BodyShort, Heading } from '@navikt/ds-react';
import { headers } from 'next/headers';
import NextLink from 'next/link';
import { DecoratorUpdater } from '@/components/decorator-updater';
import { UNIT } from '@/lib/dictionary';
import { getCurrentPath } from '@/lib/server/current-path';
import { getLanguageFromHeaders } from '@/lib/server/get-language';
import { Language, type Translation } from '@/locales';

export default async function NotFound() {
  const path = await getCurrentPath();
  const lang = getLanguageFromHeaders(await headers());

  return (
    <>
      <DecoratorUpdater
        lang={Language.NB}
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
  [Language.NB]: 'Fant ikke siden',
  [Language.NN]: 'Fant ikkje sida',
  [Language.EN]: 'Page not found',
};

const BODY: Translation = {
  [Language.NB]: `Gå til «Mine saker hos ${UNIT.klageinstans.nb}».`,
  [Language.NN]: `Gå til «Mine saker hos ${UNIT.klageinstans.nn}».`,
  [Language.EN]: `Go to «My cases with ${UNIT.klageinstans.en}».`,
};
