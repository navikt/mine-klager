import { DateTime } from '@/components/datetime';
import { InfoItem } from '@/components/info-item';
import { UNIT } from '@/lib/dictionary';
import type { Sak } from '@/lib/types';
import { Language, type Translation } from '@/locales';

interface MottattProps {
  sak: Sak;
  lang: Language;
}

export const ReceivedKlageinstans = ({ sak, lang }: MottattProps) => (
  <InfoItem label={RECEIVED_KLAGEINSTANS[lang]}>
    <DateTime id="mottatt-klageinstans" date={sak.mottattKlageinstans} lang={lang} />
  </InfoItem>
);

const RECEIVED_KLAGEINSTANS: Translation = {
  [Language.NB]: `Mottatt ${UNIT.klageinstans.nb}`,
  [Language.NN]: `Mottatt ${UNIT.klageinstans.nn}`,
  [Language.EN]: `Received by ${UNIT.klageinstans.en}`,
};
