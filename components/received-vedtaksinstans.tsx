import { DateTime } from '@/components/datetime';
import { InfoItem } from '@/components/info-item';
import { INSTANS } from '@/lib/dictionary';
import { CaseType, EventType, type Sak } from '@/lib/types';
import { Language, type Translation } from '@/locales';

interface MottattProps {
  sak: Sak;
  lang: Language;
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
  [Language.NB]: `Mottatt ${INSTANS.vedtaksinstans.nb}`,
  [Language.NN]: `Mottatt ${INSTANS.vedtaksinstans.nn}`,
  [Language.EN]: `Received by ${INSTANS.vedtaksinstans.en}`,
};
