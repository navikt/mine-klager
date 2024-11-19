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
        lang={lang}
        path={path}
        breadcrumbs={[
          {
            title: HEADING[lang],
            url: path,
          },
        ]}
      />

      <Heading size="medium" level="1" spacing>
        {HEADING[lang]}
      </Heading>

      <BodyShort spacing>
        <NextLink href="/">{LINK_TEXT[lang]}</NextLink>
      </BodyShort>
    </>
  );
}

const HEADING: Translation = {
  [Language.NB]: 'Fant ikke saken',
  [Language.NN]: 'Fant ikkje saka',
  [Language.EN]: 'Could not find the case',
};

const LINK_TEXT: Translation = {
  [Language.NB]: `Gå til «Mine klager og anker hos ${UNIT.klageinstans.nb}».`,
  [Language.NN]: `Gå til «Mine klager og ankar hos ${UNIT.klageinstans.nn}».`,
  [Language.EN]: `Go to «My complaints and appeals with ${UNIT.klageinstans.en}».`,
};
