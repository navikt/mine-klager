import { UNIT } from '@/lib/dictionary';
import { Language, type Translation } from '@/locales';
import { Alert, BodyShort, List, ReadMore } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';

interface DisclaimerProps {
  lang: Language;
  className?: string;
}

export const Disclaimer = ({ lang, className }: DisclaimerProps) => (
  <Alert variant="info" className={className}>
    <BodyShort spacing>{FIRST_LINE[lang]}</BodyShort>
    <BodyShort spacing>{SECOND_LINE[lang]}</BodyShort>
    <BodyShort spacing>{THIRD_LINE[lang]}</BodyShort>
    <ReadMore header={READ_MORE[lang]}>
      <List>
        {UNAVAILABLE[lang].map((ytelse) => (
          <ListItem key={ytelse}>{ytelse}</ListItem>
        ))}
      </List>
    </ReadMore>
  </Alert>
);

const FIRST_LINE: Translation = {
  [Language.NB]: `Her ser du dine klager og anker som er hos ${UNIT.klageinstans.nb}.`,
  [Language.NN]: `Her ser du dine klagar og ankar som er hos ${UNIT.klageinstans.nn}.`,
  [Language.EN]: `Here you can see your complaints and appeals that are with ${UNIT.klageinstans.en}.`,
};

const SECOND_LINE: Translation = {
  [Language.NB]: `Alle klager er behandlet av ${UNIT.vedtaksinstans.nb} før de havner her.`,
  [Language.NN]: `Alle klagar er handsama av ${UNIT.vedtaksinstans.nn} før dei hamnar her.`,
  [Language.EN]: `All complaints are handled by ${UNIT.vedtaksinstans.en} before they end up here.`,
};

const THIRD_LINE: Translation = {
  [Language.NB]: 'Du kan per nå dessverre ikke se klager som gjelder ytelsene i listen under.',
  [Language.NN]: 'Du kan per no dessverre ikkje sjå klagar som gjeld ytingane i lista under.',
  [Language.EN]: 'You cannot currently see complaints related to the benefits in the list below.',
};

const READ_MORE: Translation = {
  [Language.NB]: 'Trykk her for å se listen',
  [Language.NN]: 'Trykk her for å sjå lista',
  [Language.EN]: 'Click here to see the list',
};

const UNAVAILABLE: Translation<string[]> = {
  [Language.NB]: [
    'Arbeidsavklaringspenger (AAP)',
    'Dagpenger',
    'Kompensasjon for selvstendig næringsdrivende og frilanser',
    'Lønnsgaranti',
    'Lønnskompensasjon for permitterte',
    'Tvungen forvaltning',
    'Tiltak og oppfølging',
    'Bidrag',
  ],
  [Language.NN]: [
    'Arbeidsavklaringspengar (AAP)',
    'Dagpengar',
    'Kompensasjon for sjølvstendig næringsdrivande og frilansarar',
    'Lønsgaranti',
    'Lønskompensasjon for permitterte',
    'Tvungen forvalting',
    'Tiltak og oppfølging',
    'Bidrag',
  ],
  [Language.EN]: [
    'Work assessment allowance (AAP)',
    'Unemployment benefits (Dagpenger)',
    'Compensation for self-employed and freelancers',
    'Wage guarantee',
    'Salary compensation for persons who are laid-off',
    'Sanctioned administration',
    'Measures and follow-up',
    'Child support',
  ],
};
