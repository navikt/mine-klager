import { Alert, BodyShort } from '@navikt/ds-react';
import { UnavailableYtelser } from '@/app/[lang]/unavailable-ytelser';
import { UNIT } from '@/lib/dictionary';
import { Language, type Translation } from '@/locales';

interface DisclaimerProps {
  lang: Language;
  className?: string;
}

export const Disclaimer = ({ lang, className }: DisclaimerProps) => (
  <Alert variant="info" className={className}>
    <BodyShort spacing>{FIRST_LINE[lang]}</BodyShort>
    <BodyShort spacing>{SECOND_LINE[lang]}</BodyShort>
    <BodyShort spacing>{THIRD_LINE[lang]}</BodyShort>
    <UnavailableYtelser lang={lang} />
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
