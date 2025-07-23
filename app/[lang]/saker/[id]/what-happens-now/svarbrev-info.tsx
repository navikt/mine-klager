import { BodyShort } from '@navikt/ds-react';
import { SimpleDate } from '@/components/datetime';
import { UNIT } from '@/lib/dictionary';
import { CaseType } from '@/lib/types';
import { Language } from '@/locales';

interface SvarbrevInfoProps {
  date: string;
  typeId: CaseType;
  lang: Language;
}

export const SvarbrevInfo = ({ date, typeId, lang }: SvarbrevInfoProps) => {
  switch (lang) {
    case Language.NB: {
      const term = typeId === CaseType.KLAGE ? 'klagesak' : 'ankesak';

      return (
        <BodyShort>
          Du kan lese mer om gangen i en {term} og få informasjon om {UNIT.klageinstans.nb} sin saksbehandlingstid i
          brevet du fikk fra {UNIT.klageinstans.nb} <SimpleDate date={date} lang={lang} />.
        </BodyShort>
      );
    }

    case Language.NN: {
      const term = typeId === CaseType.KLAGE ? 'klagesak' : 'ankesak';

      return (
        <BodyShort>
          Du kan lese meir om gongen i ei {term} og få informasjon om {UNIT.klageinstans.nn} sin saksbehandlingstid i
          brevet du fekk frå {UNIT.klageinstans.nn} <SimpleDate date={date} lang={lang} />.
        </BodyShort>
      );
    }

    case Language.EN: {
      const term = typeId === CaseType.KLAGE ? 'a complaint case' : 'an appeal case';

      return (
        <BodyShort>
          You can read more about the process in {term} and get information about {UNIT.klageinstans.en}'s processing
          time in the letter you received from {UNIT.klageinstans.en} on <SimpleDate date={date} lang={lang} />.
        </BodyShort>
      );
    }
  }
};
