import { FullDateTime } from '@/components/datetime';
import { InfoItem } from '@/components/info-item';
import type { Sak } from '@/lib/types';
import { Language, type Translation } from '@/locales';

interface VarsletFristProps {
  sak: Sak;
  lang: Language;
}

export const VarsletFrist = ({ sak, lang }: VarsletFristProps) =>
  sak.varsletBehandlingstid === null ? null : (
    <InfoItem label={DEADLINE_LABEL[lang]}>
      <FullDateTime date={sak.varsletBehandlingstid.varsletFrist} lang={lang} />
    </InfoItem>
  );

const DEADLINE_LABEL: Translation = {
  [Language.NB]: 'Varslet frist',
  [Language.NN]: 'Varsla frist',
  [Language.EN]: 'Notified deadline',
};
