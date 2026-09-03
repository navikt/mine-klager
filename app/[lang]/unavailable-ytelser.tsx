'use client';

import { List, ReadMore } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';
import { sendMetricEvent } from '@/lib/metrics';
import { Language, type Translation } from '@/locales';

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
  [Language.NB]: ['Dagpenger', 'Lønnsgaranti', 'Tvungen forvaltning', 'Tiltak og oppfølging', 'Bidrag'],
  [Language.NN]: ['Dagpengar', 'Lønsgaranti', 'Tvungen forvalting', 'Tiltak og oppfølging', 'Bidrag'],
  [Language.EN]: [
    'Unemployment benefits (Dagpenger)',
    'Wage guarantee',
    'Sanctioned administration',
    'Measures and follow-up',
    'Child support',
  ],
};
