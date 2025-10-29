import { BodyShort, VStack } from '@navikt/ds-react';
import { UNIT } from '@/lib/dictionary';
import { EventType } from '@/lib/types';
import { Language } from '@/locales';

interface EventDescriptionProps {
  type: EventType;
  lang: Language;
}

export const EventDescription = ({ type, lang }: EventDescriptionProps) => {
  const description = EVENT_DESCRIPTIONS[type][lang];

  return (
    <VStack gap="2" flexGrow="1">
      {description.map((text) => (
        <BodyShort key={text} size="medium">
          {text}
        </BodyShort>
      ))}
    </VStack>
  );
};

const EVENT_DESCRIPTIONS: Readonly<Record<EventType, Record<Language, string[]>>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Language.NB]: [
      `Klagen din er mottatt hos ${UNIT.vedtaksinstans.nb}. De skal først vurdere om de skal gjøre om sitt eget vedtak. Om de mener vedtaket er riktig, sendes klagen videre til ${UNIT.klageinstans.nb}.`,
    ],
    [Language.NN]: [
      `Klagen din er motteke hjå ${UNIT.vedtaksinstans.nn}. Dei skal først vurdere om dei skal gjere om sitt eige vedtak. Om dei meiner vedtaket er riktig, sendast klagen vidare til ${UNIT.klageinstans.nn}.`,
    ],
    [Language.EN]: [
      `Your complaint has been received by ${UNIT.vedtaksinstans.en}. They will first consider whether they should change their own decision. If they believe the decision is correct, the complaint will be sent on to ${UNIT.klageinstans.en}.`,
    ],
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `Klagen din er mottatt hos ${UNIT.klageinstans.nb}. De skal vurdere saken din på nytt.`,
      'Når de er ferdige med behandlingen av klagen din, vil du få avgjørelsen sendt til deg.',
    ],
    [Language.NN]: [
      `Klagen din er motteke hjå ${UNIT.klageinstans.nn}. Dei skal vurdere saka di på nytt.`,
      'Når dei er ferdige med behandlinga av klagen din, vil du få avgjerda sendt til deg.',
    ],
    [Language.EN]: [
      `Your complaint has been received by ${UNIT.klageinstans.en}. They will reconsider your case.`,
      'When they have finished processing your complaint, you will receive the decision.',
    ],
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av klagen din. Du kan lese avgjørelsen i brevet du har fått fra ${UNIT.klageinstans.nb} i dokumentarkivet.`,
    ],
    [Language.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av klagen din. Du kan lese avgjerda i brevet du har fått frå ${UNIT.klageinstans.nn} i dokumentarkivet.`,
    ],
    [Language.EN]: [
      `${UNIT.klageinstans.en} has concluded the processing of your complaint. You can read the decision in the letter you have received from ${UNIT.klageinstans.en} in the document archive.`,
    ],
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `Anken din er mottatt hos ${UNIT.klageinstans.nb}.`,
      `Dersom de ikke endrer det tidligere vedtaket sitt, går saken din videre til ${UNIT.trygderetten.nb}. Du vil få mulighet til å uttale deg før saken sendes videre til ${UNIT.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `Anken din er motteke hjå ${UNIT.klageinstans.nn}.`,
      `Dersom dei ikkje endrar det tidligare vedtaket sitt, går saka di vidare til ${UNIT.trygderetten.nn}. Du vil få høve til å uttale deg før saka sendast vidare til ${UNIT.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `Your appeal has been received by ${UNIT.klageinstans.en}.`,
      `If they do not change its previous decision, your case will be sent on to the ${UNIT.trygderetten.en}. You will have the opportunity to comment before the case is sent on to the ${UNIT.trygderetten.en}.`,
    ],
  },

  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Language.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av anken din, og anken din er sendt videre til ${UNIT.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av anken din, og anken din er sendt vidare til ${UNIT.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `${UNIT.klageinstans.en} has concluded the processing of your appeal, and your appeal has been sent on to the ${UNIT.trygderetten.en}.`,
    ],
  },

  // TODO: Verify that the user has access to the decision from Trygderetten before referencing the document archive.
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Language.NB]: [`Kjennelse mottatt fra ${UNIT.trygderetten.nb}.`],
    [Language.NN]: [`Kjennelse mottatt fra ${UNIT.trygderetten.nn}.`],
    [Language.EN]: [`Appeal decision received from the ${UNIT.trygderetten.en}.`],
  },

  // TODO: Verify that the user has access to the decision from Trygderetten before referencing the document archive.
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Language.NB]: [
      `${UNIT.trygderetten.nb} har avsluttet behandlingen av anken din. Du kan lese avgjørelsen i kjennelsen fra ${UNIT.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `${UNIT.trygderetten.nn} har avslutta behandlinga av anken din. Du kan lese avgjerda i kjennelsen frå ${UNIT.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `The ${UNIT.trygderetten.en} has concluded the processing of your appeal. You can read the decision in the judgment from the ${UNIT.trygderetten.en}.`,
    ],
  },

  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av anken din. Du kan lese avgjørelsen i brevet du har fått fra ${UNIT.klageinstans.nb} i dokumentarkivet.`,
    ],
    [Language.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av anken din. Du kan lese avgjerda i brevet du har fått frå ${UNIT.klageinstans.nn} i dokumentarkivet.`,
    ],
    [Language.EN]: [
      `${UNIT.klageinstans.en} has concluded the processing of your appeal. You can read the decision in the letter you have received from ${UNIT.klageinstans.en} in the document archive.`,
    ],
  },
  [EventType.OMGJOERINGSKRAV_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `Omgjøringskravet ditt er mottatt hos ${UNIT.klageinstans.nb}.`,
      'De skal vurdere kravet ditt. Du vil få avgjørelsen sendt til deg.',
    ],
    [Language.NN]: [
      `Omgjeringskravet ditt er motteke hjå ${UNIT.klageinstans.nn}.`,
      'Dei skal vurdere kravet ditt. Du vil du få avgjerda sendt til deg.',
    ],
    [Language.EN]: [
      `Your request for reconsideration has been received by ${UNIT.klageinstans.en}.`,
      'They will consider your request. You will receive the decision.',
    ],
  },
  [EventType.OMGJOERINGSKRAV_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av omgjøringskravet ditt.`,
      `Du kan lese avgjørelsen i brevet du har fått fra ${UNIT.klageinstans.nb} i dokumentarkivet.`,
    ],
    [Language.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av omgjeringskravet ditt.`,
      `Du kan lese avgjerda i brevet du har fått frå ${UNIT.klageinstans.nn} i dokumentarkivet.`,
    ],
    [Language.EN]: [
      `${UNIT.klageinstans.en} has concluded the processing of your request for reconsideration.`,
      `You can read the decision in the letter you have received from ${UNIT.klageinstans.en} in the document archive.`,
    ],
  },

  [EventType.GJENOPPTAKSBEGJAERING_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `Begjæringen din om gjenopptak er mottatt hos ${UNIT.klageinstans.nb}.`,
      `Dersom ${UNIT.klageinstans.nb} ikke endrer det tidligere vedtaket sitt, går saken din videre til ${UNIT.trygderetten.nb}. Du vil få mulighet til å uttale deg før saken sendes videre til ${UNIT.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `Kravet ditt om gjenopning er motteke hjå ${UNIT.klageinstans.nn}.`,
      `Dersom ${UNIT.klageinstans.nn} ikkje endrar det tidligare vedtaket sitt, går saka di vidare til ${UNIT.trygderetten.nn}. Du vil få høve til å uttale deg før saka sendast vidare til ${UNIT.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `Your request for reopening has been received by ${UNIT.klageinstans.en}.`,
      `If ${UNIT.klageinstans.en} do not change its previous decision, your case will be sent on to the ${UNIT.trygderetten.en}. You will have the opportunity to comment before the case is sent on to the ${UNIT.trygderetten.en}.`,
    ],
  },
  [EventType.GJENOPPTAKSBEGJAERING_SENDT_TRYGDERETTEN]: {
    [Language.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av begjæringen din om gjenopptak, og begjæringen din er sendt videre til ${UNIT.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av kravet ditt om gjenopning, og begjæringen din er sendt vidare til ${UNIT.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `${UNIT.klageinstans.en} has concluded the processing of your request for reopening, and your request has been sent on to the ${UNIT.trygderetten.en}.`,
    ],
  },
  [EventType.GJENOPPTAKSBEGJAERING_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Language.NB]: [`Kjennelse mottatt fra ${UNIT.trygderetten.nb}.`],
    [Language.NN]: [`Kjennelse mottatt fra ${UNIT.trygderetten.nn}.`],
    [Language.EN]: [`Decision on reopening received from the ${UNIT.trygderetten.en}.`],
  },
  [EventType.GJENOPPTAKSBEGJAERING_AVSLUTTET_I_TRYGDERETTEN]: {
    [Language.NB]: [
      `${UNIT.trygderetten.nb} har avsluttet behandlingen av begjæringen din om gjenopptak. Du kan lese avgjørelsen i kjennelsen fra ${UNIT.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `${UNIT.trygderetten.nn} har avslutta behandlinga av kravet ditt om gjenopning. Du kan lese avgjerda i kjennelsen frå ${UNIT.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `The ${UNIT.trygderetten.en} has concluded the processing of your request for reopening. You can read the decision in the judgment from the ${UNIT.trygderetten.en}.`,
    ],
  },
  [EventType.GJENOPPTAKSBEGJAERING_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av begjæringen din om gjenopptak.`,
      `Du kan lese avgjørelsen i brevet du har fått fra ${UNIT.klageinstans.nb} i dokumentarkivet.`,
    ],
    [Language.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av kravet ditt om gjenopning.`,
      `Du kan lese avgjerda i brevet du har fått frå ${UNIT.klageinstans.nn} i dokumentarkivet.`,
    ],
    [Language.EN]: [
      `${UNIT.klageinstans.en} has concluded the processing of your request for reopening.`,
      `You can read the decision in the letter you have received from ${UNIT.klageinstans.en} in the document archive.`,
    ],
  },
};
