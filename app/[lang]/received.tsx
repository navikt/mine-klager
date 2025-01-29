import { DateTime } from '@/components/datetime';
import { InfoItem } from '@/components/info-item';
import { ReceivedKlageinstans } from '@/components/received-klageinstans';
import { UNIT } from '@/lib/dictionary';
import { CaseType, EventType, type Sak } from '@/lib/types';
import { Languages, type Translation } from '@/locales';

interface MottattProps {
  sak: Sak;
  lang: Languages;
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
  [Languages.NB]: `Mottatt ${UNIT.vedtaksinstans.nb}`,
  [Languages.NN]: `Mottatt ${UNIT.vedtaksinstans.nn}`,
  [Languages.EN]: `Received by ${UNIT.vedtaksinstans.en}`,
};
