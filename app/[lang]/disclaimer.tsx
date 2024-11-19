import { Languages, type Translation } from '@/locales';
import { Alert, BodyShort } from '@navikt/ds-react';

interface DisclaimerProps {
  lang: Languages;
  className?: string;
}

export const Disclaimer = ({ lang, className }: DisclaimerProps) => (
  <Alert variant="info" className={className}>
    <BodyShort spacing>{FIRST_LINE[lang]}</BodyShort>
    <BodyShort>{SECOND_LINE[lang]}</BodyShort>
  </Alert>
);

const FIRST_LINE: Translation = {
  [Languages.NB]: 'Alle klager behandles av vedtaksinstansen før de vises her.',
  [Languages.NN]: 'Alle klager blir behandla av vedtaksinstansen før dei blir vist her.',
  [Languages.EN]: 'All complaints are processed by the decision-making body before they are shown here.',
};

const SECOND_LINE: Translation = {
  [Languages.NB]:
    'Her ser du klager og anker som er hos Nav klageinstans. Du ser bare klager og anker for noen ytelser.',
  [Languages.NN]:
    'Her ser du klager og anker som er hos Nav klageinstans. Du ser berre klager og anker for nokre ytingar.',
  [Languages.EN]:
    'Here you can see complaints and appeals that are with Nav Complaints Unit (Nav klageinstans). You only see complaints and appeals for some services.',
};
