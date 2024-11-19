import { DateTime } from '@/components/datetime';
import { InfoItem } from '@/components/info-item';
import type { Sak } from '@/lib/types';
import { Languages, type Translation } from '@/locales';

interface MottattProps {
  sak: Sak;
  lang: Languages;
}

export const ReceivedKlageinstans = ({ sak, lang }: MottattProps) => (
  <InfoItem label={RECEIVED_KLAGEINSTANS[lang]}>
    <DateTime id="mottatt-klageinstans" date={sak.mottattKlageinstans} lang={lang} />
  </InfoItem>
);

const RECEIVED_KLAGEINSTANS: Translation = {
  [Languages.NB]: 'Mottatt klageinstans',
  [Languages.NN]: 'Mottatt klageinstans',
  [Languages.EN]: 'Received by Nav Complaints Unit (Nav klageinstans)',
};
