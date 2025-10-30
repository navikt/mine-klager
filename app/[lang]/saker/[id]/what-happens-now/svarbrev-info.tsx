import { BodyShort } from '@navikt/ds-react';
import { SimpleDate } from '@/components/datetime';
import { INSTANS } from '@/lib/dictionary';
import { Language } from '@/locales';

interface SvarbrevInfoProps {
  date: string;
  lang: Language;
}

export const SvarbrevInfo = ({ date, lang }: SvarbrevInfoProps) => {
  switch (lang) {
    case Language.NB: {
      return (
        <BodyShort>
          Du kan lese mer og få informasjon om {INSTANS.klageinstans.nb} sin saksbehandlingstid i brevet du fikk fra{' '}
          {INSTANS.klageinstans.nb} <SimpleDate date={date} lang={lang} />.
        </BodyShort>
      );
    }

    case Language.NN: {
      return (
        <BodyShort>
          Du kan lese meir og få informasjon om {INSTANS.klageinstans.nn} si saksbehandlingstid i brevet du fekk frå{' '}
          {INSTANS.klageinstans.nn} <SimpleDate date={date} lang={lang} />.
        </BodyShort>
      );
    }

    case Language.EN: {
      return (
        <BodyShort>
          You can read more and get information about {INSTANS.klageinstans.en}'s processing time in the letter you
          received from {INSTANS.klageinstans.en} on <SimpleDate date={date} lang={lang} />.
        </BodyShort>
      );
    }
  }
};
