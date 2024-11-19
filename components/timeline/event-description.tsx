import { EventType } from '@/lib/types';
import { Languages, type Translation } from '@/locales';
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

const READ_MORE: Translation = {
  [Languages.NB]: 'Les mer',
  [Languages.NN]: 'Les meir',
  [Languages.EN]: 'Read more',
};

const EVENT_DESCRIPTIONS: Readonly<Record<EventType, Record<Languages, string[]>>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Languages.NB]: [
      'Klagen din er mottatt hos vedtaksinstansen. Vedtaksinstansen skal først vurdere om de skal gjøre om sitt eget vedtak. Om de mener vedtaket er riktig, sendes klagen videre til Nav klageinstans.',
    ],
    [Languages.NN]: [
      'Klagen din er motteke hjå vedtaksinstansen. Vedtaksinstansen skal først vurdere om dei skal gjere om sitt eige vedtak. Om dei meiner vedtaket er riktig, sendast klagen vidare til Nav klageinstans.',
    ],
    [Languages.EN]: [
      'Your complaint has been received by Nav. Nav will first consider whether they should change their own decision. If they believe the decision is correct, the complaint will be sent on to Nav Complaints Unit (Nav klageinstans).',
    ],
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: [
      'Klagen din er mottatt hos Nav klageinstans.',
      'Nav klageinstanseskal vurdere saken din på nytt.',
      'Når klageinstans er ferdige med behandlingen av klagen din, vil du få avgjørelsen sendt til deg.',
    ],
    [Languages.NN]: [
      'Klagen din er motteke hjå Nav klageinstans.',
      'Nav klageinstans skal vurdere saka di på nytt.',
      'Når klageinstansen er ferdige med behandlinga av klagen din, vil du få avgjerda sendt til deg.',
    ],
    [Languages.EN]: [
      'Your complaint has been received by Nav Complaints Unit (Nav klageinstans).',
      'Nav Complaints Unit (Nav klageinstans) will reconsider your case.',
      'When Nav Complaints Unit (Nav klageinstans) has finished processing your complaint, you will receive the decision.',
    ],
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: [
      'Nav klageinstans har avsluttet behandlingen av klagen din. Du kan lese avgjørelsen i brevet du har fått fra klageinstansen.',
    ],
    [Languages.NN]: [
      'Nav klageinstans har avslutta behandlinga av klagen din. Du kan lese avgjerda i brevet du har fått frå klageinstansen.',
    ],
    [Languages.EN]: [
      'Nav Complaints Unit (Nav klageinstans) has concluded the processing of your complaint. You can read the decision in the letter you have received from Nav Complaints Unit (Nav klageinstans).',
    ],
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: [
      'Anken din er mottatt hos Nav klageinstans.',
      'Dersom klageinstansen ikke endrer det tidligere vedtaket sitt, går saken din videre til Trygderetten. Du vil få mulighet til å uttale deg før saken sendes videre til Trygderetten.',
    ],
    [Languages.NN]: [
      'Anken din er motteke hjå Nav klageinstans.',
      'Dersom klageinstansen ikkje endrar det tidligare vedtaket sitt, går saka di vidare til Trygderetten. Du vil få høve til å uttale deg før saka sendast vidare til Trygderetten.',
    ],
    [Languages.EN]: [
      'Your appeal has been received by Nav Complaints Unit (Nav klageinstans).',
      'If Nav Complaints Unit (Nav klageinstans) does not change its previous decision, your case will be sent on to the National Insurance Court. You will have the opportunity to comment before the case is sent on to the National Insurance Court.',
    ],
  },

  // anke i TR-oppgave er opprettet
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Languages.NB]: [
      'Nav klageinstans har avsluttet behandlingen av anken din, og anken din er sendt videre til Trygderetten.',
    ],
    [Languages.NN]: [
      'Nav klageinstans har avslutta behandlinga av anken din, og anken din er sendt vidare til Trygderetten.',
    ],
    [Languages.EN]: [
      'Nav Complaints Unit (Nav klageinstans) has concluded the processing of your appeal, and your appeal has been sent on to the National Insurance Court.',
    ],
  },

  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Languages.NB]: ['Kjennelse mottatt fra Trygderetten'],
    [Languages.NN]: ['Kjennelse mottatt fra Trygderetten'],
    [Languages.EN]: ['Appeal decision received from the National Insurance Court'],
  },

  // anke i TR-oppgave er fullført
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Languages.NB]: [
      'Trygderetten har avsluttet behandlingen av anken din. Du kan lese avgjørelsen i kjennelsen fra Trygderetten.',
    ],
    [Languages.NN]: [
      'Trygderetten har avslutta behandlinga av anken din. Du kan lese avgjerdai kjennelsen frå Trygderetten.',
    ],
    [Languages.EN]: [
      'The National Insurance Court has concluded the processing of your appeal. You can read the decision in the judgment from the National Insurance Court.',
    ],
  },

  // uten at anke i TR-oppgave er opprettet
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: [
      'Nav klageinstans har avsluttet behandlingen av anken din. Du kan lese avgjørelsen i brevet du har fått fra klageinstansen.',
    ],
    [Languages.NN]: [
      'Nav klageinstans har avslutta behandlinga av anken din. Du kan lese avgjerda i brevet du har fått frå klageinstansen.',
    ],
    [Languages.EN]: [
      'Nav Complaints Unit (Nav klageinstans) has concluded the processing of your appeal. You can read the decision in the letter you have received from Nav Complaints Unit (Nav klageinstans).',
    ],
  },
  [EventType.OMGJOERINGSKRAV_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: [
      'Omgjøringskravet ditt er mottatt hos Nav klageinstans.',
      'Nav klageinstans skal vurdere kravet ditt. Du vil få avgjørelsen sendt til deg.',
    ],
    [Languages.NN]: [
      'Omgjeringskravet ditt er motteke hjå Nav klageinstans.',
      'Nav klageinstans skal vurdere kravet ditt. Du vil du få avgjerda sendt til deg.',
    ],
    [Languages.EN]: [
      'Your request for reconsideration has been received by Nav Complaints Unit (Nav klageinstans).',
      'Nav Complaints Unit (Nav klageinstans) will consider your request. You will receive the decision.',
    ],
  },
  [EventType.OMGJOERINGSKRAV_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: [
      'Nav klageinstans har avsluttet behandlingen av omgjøringskravet ditt.',
      'Du kan lese avgjørelsen i brevet du har fått fra klageinstansen.',
    ],
    [Languages.NN]: [
      'Nav klageinstans har avslutta behandlinga av omgjeringskravet ditt.',
      'Du kan lese avgjerda i brevet du har fått frå klageinstansen.',
    ],
    [Languages.EN]: [
      'Nav Complaints Unit (Nav klageinstans) has concluded the processing of your request for reconsideration.',
      'You can read the decision in the letter you have received from Nav Complaints Unit (Nav klageinstans)',
    ],
  },
};
