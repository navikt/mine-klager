import { EventType } from '@/lib/types';
import { Languages } from '@/locales';
import { BodyShort, ReadMore, VStack } from '@navikt/ds-react';

interface EventDescriptionProps {
  type: EventType;
  lang: Languages;
}

export const EventDescription = ({ type, lang }: EventDescriptionProps) => {
  const [description, ...readMore] = EVENT_DESCRIPTIONS[type][lang];

  return (
    <VStack gap="2" flexGrow="1">
      <BodyShort size="medium">{description}</BodyShort>

      {readMore.length === 0 ? null : (
        <ReadMore header={READ_MORE[lang]} size="medium">
          {readMore.map((text) => (
            <BodyShort key={text} size="medium">
              {text}
            </BodyShort>
          ))}
        </ReadMore>
      )}
    </VStack>
  );
};

const READ_MORE: Record<Languages, string> = {
  [Languages.NB]: 'Les mer',
  [Languages.NN]: 'Les meir',
  [Languages.EN]: 'Read more',
};

const EVENT_DESCRIPTIONS: Readonly<Record<EventType, Record<Languages, string[]>>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Languages.NB]: [
      'Klagen din ble mottatt hos vedtaksinstansen. Dersom de ikke tar klagen til følge, vil den bli sendt videre til klageinstansen.',
      'Dersom du har mer informasjon eller dokumentasjon som kan være relevant for saken, kan du ettersende det.',
    ],
    [Languages.NN]: [
      'Klagen din ble mottatt hos vedtaksinstansen. Dersom dei ikkje tek klagen til følgje, vil den bli send vidare til klageinstansen.',
      'Dersom du har meir informasjon eller dokumentasjon som kan vere relevant for saka, kan du ettersende det.',
    ],
    [Languages.EN]: [
      'Your complaint has been received by the decision-making body. If they do not uphold the complaint, it will be sent to the complaints body.',
      'If you have more information or documentation that may be relevant to the case, you can send it to us.',
    ],
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: [
      'Klagen din ble mottatt av Nav klageinstans. Klageinstansen vil behandle klagen din og gi deg en begrunnelse for vedtaket.',
    ],
    [Languages.NN]: ['Klage mottatt klageinstans'],
    [Languages.EN]: ['Complaint received by complaints body'],
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: ['Klage avsluttet i klageinstans'],
    [Languages.NN]: ['Klage avsluttet i klageinstans'],
    [Languages.EN]: ['Complaint concluded by complaints body'],
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: ['Anke mottatt klageinstans'],
    [Languages.NN]: ['Anke mottatt klageinstans'],
    [Languages.EN]: ['Appeal received by complaints body'],
  },
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Languages.NB]: ['Anke sendt til Trygderetten'],
    [Languages.NN]: ['Anke sendt til Trygderetten'],
    [Languages.EN]: ['Appeal sent to the National Insurance Court'],
  },
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Languages.NB]: ['Anke kjennelse mottatt fra Trygderetten'],
    [Languages.NN]: ['Anke kjennelse mottatt fra Trygderetten'],
    [Languages.EN]: ['Appeal decision received from the National Insurance Court'],
  },
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Languages.NB]: ['Anke avsluttet i Trygderetten'],
    [Languages.NN]: ['Anke avsluttet i Trygderetten'],
    [Languages.EN]: ['Appeal concluded by the National Insurance Court'],
  },
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: ['Anke avsluttet i klageinstans'],
    [Languages.NN]: ['Anke avsluttet i klageinstans'],
    [Languages.EN]: ['Appeal concluded by complaints body'],
  },
};
