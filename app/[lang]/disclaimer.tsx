import { BodyShort, InfoCard } from '@navikt/ds-react';
import { InfoCardContent } from '@navikt/ds-react/InfoCard';
import { UnavailableYtelser } from '@/app/[lang]/unavailable-ytelser';
import { INSTANS } from '@/lib/dictionary';
import { Language, type Translation } from '@/locales';

interface DisclaimerProps {
  lang: Language;
  className?: string;
}

export const Disclaimer = ({ lang, className }: DisclaimerProps) => (
  <InfoCard data-color="info" className={className}>
    <InfoCardContent>
      <BodyShort spacing>{FIRST_LINE[lang]}</BodyShort>
      <BodyShort spacing>{SECOND_LINE[lang]}</BodyShort>
      <BodyShort spacing>{THIRD_LINE[lang]}</BodyShort>
      <UnavailableYtelser lang={lang} />
    </InfoCardContent>
  </InfoCard>
);

const FIRST_LINE: Translation = {
  [Language.NB]: `Her ser du dine saker som er hos ${INSTANS.klageinstans.nb}.`,
  [Language.NN]: `Her ser du dine saker som er hos ${INSTANS.klageinstans.nn}.`,
  [Language.EN]: `Here you can see your cases that are with ${INSTANS.klageinstans.en}.`,
};

const SECOND_LINE: Translation = {
  [Language.NB]: `Klagen din skal først behandles av ${INSTANS.vedtaksinstans.nb} som gjorde vedtaket som du har klaget på. Klagesaken din blir synlig på denne siden når ${INSTANS.vedtaksinstans.nb} har sendt saken videre til ${INSTANS.klageinstans.nb}.`,
  [Language.NN]: `Klagen din skal fyrst behandlast av ${INSTANS.vedtaksinstans.nn} som gjorde vedtaket du har klaga på. Klagesaka di blir synleg på denne sida når ${INSTANS.vedtaksinstans.nn} har sendt saka vidare til ${INSTANS.klageinstans.nn}.`,
  [Language.EN]: `Your complaint will first be processed by ${INSTANS.vedtaksinstans.en} that made the decision you have complained about. Your complaint case will become visible on this page when ${INSTANS.vedtaksinstans.en} has forwarded the case to ${INSTANS.klageinstans.en}.`,
};

const THIRD_LINE: Translation = {
  [Language.NB]: `Du kan per nå dessverre ikke se saker hos ${INSTANS.klageinstans.nb} som gjelder ytelsene i listen under.`,
  [Language.NN]: `Du kan per no dessverre ikkje sjå saker hos ${INSTANS.klageinstans.nn} som gjeld ytingane i lista under.`,
  [Language.EN]: `You cannot currently see cases with ${INSTANS.klageinstans.en} related to the benefits in the list below.`,
};
