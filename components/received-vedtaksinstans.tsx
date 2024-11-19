import { DateTime } from '@/components/datetime';
import { InfoItem } from '@/components/info-item';
import { CaseType, EventType, type Sak } from '@/lib/types';
import { Languages, type Translation } from '@/locales';

interface MottattProps {
  sak: Sak;
  lang: Languages;
}

export const ReceivedVedtaksinstans = ({ sak, lang }: MottattProps) => {
  if (sak.typeId !== CaseType.KLAGE) {
    return null;
  }

  const mottattVedtaksinstans = sak.events.find((event) => event.type === EventType.KLAGE_MOTTATT_VEDTAKSINSTANS);

  if (mottattVedtaksinstans !== undefined) {
    return (
      <InfoItem label={RECEIVED_VEDTAKSINSTANS[lang]}>
        <DateTime id="mottatt-vedtaksinstans" date={mottattVedtaksinstans.date} lang={lang} />
      </InfoItem>
    );
  }
};

const RECEIVED_VEDTAKSINSTANS: Translation = {
  [Languages.NB]: 'Mottatt vedtaksinstans',
  [Languages.NN]: 'Mottatt vedtaksinstans',
  [Languages.EN]: 'Received by Nav',
};
