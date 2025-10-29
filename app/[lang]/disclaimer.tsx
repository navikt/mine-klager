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
  [Language.NB]: `Her ser du dine saker som er hos ${UNIT.klageinstans.nb}.`,
  [Language.NN]: `Her ser du dine saker som er hos ${UNIT.klageinstans.nn}.`,
  [Language.EN]: `Here you can see your cases that are with ${UNIT.klageinstans.en}.`,
};

const SECOND_LINE: Translation = {
  [Language.NB]: `Klagen din skal først behandles av ${UNIT.vedtaksinstans.nb} som gjorde vedtaket som du har klaget på. Klagesaken din blir synlig på denne siden når ${UNIT.vedtaksinstans.nb} har sendt saken videre til ${UNIT.klageinstans.nb}.`,
  [Language.NN]: `Klagen din skal fyrst behandlast av ${UNIT.vedtaksinstans.nn} som gjorde vedtaket du har klaga på. Klagesaka di blir synleg på denne sida når ${UNIT.vedtaksinstans.nn} har sendt saka vidare til ${UNIT.klageinstans.nn}.`,
  [Language.EN]: `Your complaint will first be processed by ${UNIT.vedtaksinstans.en} that made the decision you have complained about. Your complaint case will become visible on this page when ${UNIT.vedtaksinstans.en} has forwarded the case to ${UNIT.klageinstans.en}.`,
};

const THIRD_LINE: Translation = {
  [Language.NB]: `Du kan per nå dessverre ikke se saker hos ${UNIT.klageinstans.nb} som gjelder ytelsene i listen under.`,
  [Language.NN]: `Du kan per no dessverre ikkje sjå saker hos ${UNIT.klageinstans.nn} som gjeld ytingane i lista under.`,
  [Language.EN]: `You cannot currently see cases with ${UNIT.klageinstans.en} related to the benefits in the list below.`,
};
