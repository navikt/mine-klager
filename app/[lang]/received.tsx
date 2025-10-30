import { DateTime } from '@/components/datetime';
import { InfoItem } from '@/components/info-item';
import { ReceivedKlageinstans } from '@/components/received-klageinstans';
import { INSTANS } from '@/lib/dictionary';
import { CaseType, EventType, type Sak } from '@/lib/types';
import { Language, type Translation } from '@/locales';

interface MottattProps {
  sak: Sak;
  lang: Language;
}

export const Received = ({ sak, lang }: MottattProps) => {
  if (sak.typeId === CaseType.KLAGE) {
    const mottattVedtaksinstans = sak.events.find((event) => event.type === EventType.KLAGE_MOTTATT_VEDTAKSINSTANS);

    if (mottattVedtaksinstans !== undefined) {
      return (
        <InfoItem label={RECEIVED_VEDTAKSINSTANS[lang]}>
          <DateTime id="mottatt-vedtaksinstans" date={mottattVedtaksinstans.date} lang={lang} />
        </InfoItem>
      );
    }
  }

  return <ReceivedKlageinstans sak={sak} lang={lang} />;
};

const RECEIVED_VEDTAKSINSTANS: Translation = {
  [Language.NB]: `Mottatt ${INSTANS.vedtaksinstans.nb}`,
  [Language.NN]: `Mottatt ${INSTANS.vedtaksinstans.nn}`,
  [Language.EN]: `Received by ${INSTANS.vedtaksinstans.en}`,
};
