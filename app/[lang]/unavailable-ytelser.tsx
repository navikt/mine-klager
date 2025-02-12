'use client';

import { sendMetricEvent } from '@/lib/metrics';
import { Language, type Translation } from '@/locales';
import { List, ReadMore } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';

interface UnavailableYtelserProps {
  lang: Language;
}

export const UnavailableYtelser = ({ lang }: UnavailableYtelserProps) => (
  <ReadMore
    header={READ_MORE[lang]}
    onOpenChange={(open) =>
      sendMetricEvent('show-unavailable-ytelser', 'case-list', { lang, open: open ? 'open' : 'close' })
    }
  >
    <List>
      {UNAVAILABLE[lang].map((ytelse) => (
        <ListItem key={ytelse}>{ytelse}</ListItem>
      ))}
    </List>
  </ReadMore>
);

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
    'Tvungen forvaltning',
    'Tiltak og oppfølging',
    'Bidrag',
  ],
  [Language.NN]: [
    'Arbeidsavklaringspengar (AAP)',
    'Dagpengar',
    'Kompensasjon for sjølvstendig næringsdrivande og frilansarar',
    'Lønsgaranti',
    'Tvungen forvalting',
    'Tiltak og oppfølging',
    'Bidrag',
  ],
  [Language.EN]: [
    'Work assessment allowance (AAP)',
    'Unemployment benefits (Dagpenger)',
    'Compensation for self-employed and freelancers',
    'Wage guarantee',
    'Sanctioned administration',
    'Measures and follow-up',
    'Child support',
  ],
};
