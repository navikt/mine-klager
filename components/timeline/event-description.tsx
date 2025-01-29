import { UNIT } from '@/lib/dictionary';
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
      `Klagen din er mottatt hos ${UNIT.vedtaksinstans.nb}. ${UNIT.vedtaksinstans.nb} skal først vurdere om de skal gjøre om sitt eget vedtak. Om de mener vedtaket er riktig, sendes klagen videre til ${UNIT.klageinstans.nb}.`,
    ],
    [Languages.NN]: [
      `Klagen din er motteke hjå ${UNIT.vedtaksinstans.nn}. ${UNIT.vedtaksinstans.nn} skal først vurdere om dei skal gjere om sitt eige vedtak. Om dei meiner vedtaket er riktig, sendast klagen vidare til ${UNIT.klageinstans.nn}.`,
    ],
    [Languages.EN]: [
      `Your complaint has been received by ${UNIT.vedtaksinstans.en}. ${UNIT.vedtaksinstans.en} will first consider whether they should change their own decision. If they believe the decision is correct, the complaint will be sent on to ${UNIT.klageinstans.en}.`,
    ],
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: [
      `Klagen din er mottatt hos ${UNIT.klageinstans.nb}.`,
      `${UNIT.klageinstans.nb} skal vurdere saken din på nytt.`,
      `Når ${UNIT.klageinstans.nb} er ferdige med behandlingen av klagen din, vil du få avgjørelsen sendt til deg.`,
    ],
    [Languages.NN]: [
      `Klagen din er motteke hjå ${UNIT.klageinstans.nn}.`,
      `${UNIT.klageinstans.nn} skal vurdere saka di på nytt.`,
      `Når ${UNIT.klageinstans.nn} er ferdige med behandlinga av klagen din, vil du få avgjerda sendt til deg.`,
    ],
    [Languages.EN]: [
      `Your complaint has been received by ${UNIT.klageinstans.en}.`,
      `${UNIT.klageinstans.en} will reconsider your case.`,
      `When ${UNIT.klageinstans.en} has finished processing your complaint, you will receive the decision.`,
    ],
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av klagen din. Du kan lese avgjørelsen i brevet du har fått fra ${UNIT.klageinstans.nb}.`,
    ],
    [Languages.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av klagen din. Du kan lese avgjerda i brevet du har fått frå ${UNIT.klageinstans.nn}.`,
    ],
    [Languages.EN]: [
      `${UNIT.klageinstans.en} has concluded the processing of your complaint. You can read the decision in the letter you have received from ${UNIT.klageinstans.en}.`,
    ],
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: [
      `Anken din er mottatt hos ${UNIT.klageinstans.nb}.`,
      `Dersom ${UNIT.klageinstans.nb} ikke endrer det tidligere vedtaket sitt, går saken din videre til ${UNIT.trygderetten.nb}. Du vil få mulighet til å uttale deg før saken sendes videre til ${UNIT.trygderetten.nb}.`,
    ],
    [Languages.NN]: [
      `Anken din er motteke hjå ${UNIT.klageinstans.nn}.`,
      `Dersom ${UNIT.klageinstans.nn} ikkje endrar det tidligare vedtaket sitt, går saka di vidare til ${UNIT.trygderetten.nn}. Du vil få høve til å uttale deg før saka sendast vidare til ${UNIT.trygderetten.nn}.`,
    ],
    [Languages.EN]: [
      `Your appeal has been received by ${UNIT.klageinstans.en}.`,
      `If ${UNIT.klageinstans.en} does not change its previous decision, your case will be sent on to the ${UNIT.trygderetten.en}. You will have the opportunity to comment before the case is sent on to the ${UNIT.trygderetten.en}.`,
    ],
  },

  // anke i TR-oppgave er opprettet
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Languages.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av anken din, og anken din er sendt videre til ${UNIT.trygderetten.nb}.`,
    ],
    [Languages.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av anken din, og anken din er sendt vidare til ${UNIT.trygderetten.nn}.`,
    ],
    [Languages.EN]: [
      `${UNIT.klageinstans.en} has concluded the processing of your appeal, and your appeal has been sent on to the ${UNIT.trygderetten.en}.`,
    ],
  },

  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Languages.NB]: [`Kjennelse mottatt fra ${UNIT.trygderetten.nb}`],
    [Languages.NN]: [`Kjennelse mottatt fra ${UNIT.trygderetten.nn}`],
    [Languages.EN]: [`Appeal decision received from the ${UNIT.trygderetten.en}`],
  },

  // anke i TR-oppgave er fullført
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Languages.NB]: [
      `${UNIT.trygderetten.nb} har avsluttet behandlingen av anken din. Du kan lese avgjørelsen i kjennelsen fra ${UNIT.trygderetten.nb}.`,
    ],
    [Languages.NN]: [
      `${UNIT.trygderetten.nn} har avslutta behandlinga av anken din. Du kan lese avgjerdai kjennelsen frå ${UNIT.trygderetten.nn}.`,
    ],
    [Languages.EN]: [
      `The ${UNIT.trygderetten.en} has concluded the processing of your appeal. You can read the decision in the judgment from the ${UNIT.trygderetten.en}.`,
    ],
  },

  // uten at anke i TR-oppgave er opprettet
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av anken din. Du kan lese avgjørelsen i brevet du har fått fra ${UNIT.klageinstans.nb}.`,
    ],
    [Languages.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av anken din. Du kan lese avgjerda i brevet du har fått frå ${UNIT.klageinstans.nn}.`,
    ],
    [Languages.EN]: [
      `${UNIT.klageinstans.en} has concluded the processing of your appeal. You can read the decision in the letter you have received from ${UNIT.klageinstans.en}.`,
    ],
  },
  [EventType.OMGJOERINGSKRAV_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: [
      `Omgjøringskravet ditt er mottatt hos ${UNIT.klageinstans.nb}.`,
      `${UNIT.klageinstans.nb} skal vurdere kravet ditt. Du vil få avgjørelsen sendt til deg.`,
    ],
    [Languages.NN]: [
      `Omgjeringskravet ditt er motteke hjå ${UNIT.klageinstans.nn}.`,
      `${UNIT.klageinstans.nn} skal vurdere kravet ditt. Du vil du få avgjerda sendt til deg.`,
    ],
    [Languages.EN]: [
      `Your request for reconsideration has been received by ${UNIT.klageinstans.en}.`,
      `${UNIT.klageinstans.en} will consider your request. You will receive the decision.`,
    ],
  },
  [EventType.OMGJOERINGSKRAV_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av omgjøringskravet ditt.`,
      `Du kan lese avgjørelsen i brevet du har fått fra ${UNIT.klageinstans.nb}.`,
    ],
    [Languages.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av omgjeringskravet ditt.`,
      `Du kan lese avgjerda i brevet du har fått frå ${UNIT.klageinstans.nn}.`,
    ],
    [Languages.EN]: [
      `${UNIT.klageinstans.en} has concluded the processing of your request for reconsideration.`,
      `You can read the decision in the letter you have received from ${UNIT.klageinstans.en}`,
    ],
  },
};
