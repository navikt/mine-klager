import { DecoratorUpdater } from '@/components/decorator-updater';
import { getCurrentPath } from '@/lib/current-path';
import { UNIT } from '@/lib/dictionary';
import { getLanguageFromHeaders } from '@/lib/get-language';
import { Language, type Translation } from '@/locales';
import { BodyShort, Heading } from '@navikt/ds-react';
import { headers } from 'next/headers';
import NextLink from 'next/link';

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
  [Language.NB]: `Gå til «Mine klager og anker hos ${UNIT.klageinstans.nb}».`,
  [Language.NN]: `Gå til «Mine klagar og ankar hos ${UNIT.klageinstans.nn}».`,
  [Language.EN]: `Go to «My complaints and appeals with ${UNIT.klageinstans.en}».`,
};
