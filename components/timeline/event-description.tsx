import { BodyShort, VStack } from '@navikt/ds-react';
import { INSTANS } from '@/lib/dictionary';
import { EventType } from '@/lib/types';
import { Language } from '@/locales';

interface EventDescriptionProps {
  type: EventType;
  lang: Language;
}

export const EventDescription = ({ type, lang }: EventDescriptionProps) => {
  const description = EVENT_DESCRIPTIONS[type][lang];

  return (
    <VStack gap="space-8" flexGrow="1">
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
      `Klagen din er mottatt hos ${INSTANS.vedtaksinstans.nb}. ${INSTANS.vedtaksinstans.nb} skal først vurdere om de skal gjøre om sitt eget vedtak. Om ${INSTANS.vedtaksinstans.nb} mener vedtaket er riktig, sendes klagen videre til ${INSTANS.klageinstans.nb}.`,
    ],
    [Language.NN]: [
      `Klagen din er motteke hjå ${INSTANS.vedtaksinstans.nn}. ${INSTANS.vedtaksinstans.nn} skal først vurdere om dei skal gjere om sitt eige vedtak. Om ${INSTANS.vedtaksinstans.nn} meiner vedtaket er riktig, sendast klagen vidare til ${INSTANS.klageinstans.nn}.`,
    ],
    [Language.EN]: [
      `Your complaint has been received by ${INSTANS.vedtaksinstans.en}. ${INSTANS.vedtaksinstans.en} will first consider whether they should change their own decision. If ${INSTANS.vedtaksinstans.en} believe the decision is correct, the complaint will be sent on to ${INSTANS.klageinstans.en}.`,
    ],
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `Klagen din er mottatt hos ${INSTANS.klageinstans.nb}. Vi skal vurdere saken din på nytt.`,
      `Når ${INSTANS.klageinstans.nb} er ferdige med behandlingen av klagen din, vil du få avgjørelsen sendt til deg.`,
    ],
    [Language.NN]: [
      `Klagen din er motteke hjå ${INSTANS.klageinstans.nn}. Vi skal vurdere saka di på nytt.`,
      `Når ${INSTANS.klageinstans.nn} er ferdige med behandlinga av klagen din, vil du få avgjerda sendt til deg.`,
    ],
    [Language.EN]: [
      `Your complaint has been received by ${INSTANS.klageinstans.en}. We will reconsider your case.`,
      `When ${INSTANS.klageinstans.en} have finished processing your complaint, you will receive the decision.`,
    ],
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} har behandlet klagen din. Du kan lese avgjørelsen i brevet du har fått fra ${INSTANS.klageinstans.nb} i dokumentarkivet.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} har behandla klagen din. Du kan lese avgjerda i brevet du har fått frå ${INSTANS.klageinstans.nn} i dokumentarkivet.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} has processed your complaint. You can read the decision in the letter you have received from ${INSTANS.klageinstans.en} in the document archive.`,
    ],
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `Anken din er mottatt hos ${INSTANS.klageinstans.nb}.`,
      `Dersom ${INSTANS.klageinstans.nb} ikke endrer det tidligere vedtaket sitt, går saken din videre til ${INSTANS.trygderetten.nb}. Du vil få mulighet til å uttale deg før saken sendes videre til ${INSTANS.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `Anken din er motteke hjå ${INSTANS.klageinstans.nn}.`,
      `Dersom ${INSTANS.klageinstans.nn} ikkje endrar det tidligare vedtaket sitt, går saka di vidare til ${INSTANS.trygderetten.nn}. Du vil få høve til å uttale deg før saka sendast vidare til ${INSTANS.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `Your appeal has been received by ${INSTANS.klageinstans.en}.`,
      `If ${INSTANS.klageinstans.en} do not change its previous decision, your case will be sent on to the ${INSTANS.trygderetten.en}. You will have the opportunity to comment before the case is sent on to the ${INSTANS.trygderetten.en}.`,
    ],
  },

  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} har behandlet anken din, og anken din er sendt videre til ${INSTANS.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} har behandla anken din, og anken din er sendt vidare til ${INSTANS.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} has processed your appeal, and your appeal has been sent on to the ${INSTANS.trygderetten.en}.`,
    ],
  },

  // TODO: Verify that the user has access to the decision from Trygderetten before referencing the document archive.
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Language.NB]: [`Kjennelse mottatt fra ${INSTANS.trygderetten.nb}.`],
    [Language.NN]: [`Kjennelse mottatt fra ${INSTANS.trygderetten.nn}.`],
    [Language.EN]: [`Decision received from the ${INSTANS.trygderetten.en}.`],
  },

  // TODO: Verify that the user has access to the decision from Trygderetten before referencing the document archive.
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Language.NB]: [
      `${INSTANS.trygderetten.nb} har behandlet anken din. Du kan lese avgjørelsen i kjennelsen fra ${INSTANS.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `${INSTANS.trygderetten.nn} har behandla anken din. Du kan lese avgjerda i kjennelsen frå ${INSTANS.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `The ${INSTANS.trygderetten.en} has processed your appeal. You can read the decision in the judgment from the ${INSTANS.trygderetten.en}.`,
    ],
  },

  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} har behandlet anken din. Du kan lese avgjørelsen i brevet du har fått fra ${INSTANS.klageinstans.nb} i dokumentarkivet.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} har behandla anken din. Du kan lese avgjerda i brevet du har fått frå ${INSTANS.klageinstans.nn} i dokumentarkivet.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} has processed your appeal. You can read the decision in the letter you have received from ${INSTANS.klageinstans.en} in the document archive.`,
    ],
  },
  [EventType.OMGJOERINGSKRAV_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `Omgjøringskravet ditt er mottatt hos ${INSTANS.klageinstans.nb}.`,
      `${INSTANS.klageinstans.nb} skal vurdere kravet ditt. Du vil få avgjørelsen sendt til deg.`,
    ],
    [Language.NN]: [
      `Omgjeringskravet ditt er motteke hjå ${INSTANS.klageinstans.nn}.`,
      `${INSTANS.klageinstans.nn} skal vurdere kravet ditt. Du vil du få avgjerda sendt til deg.`,
    ],
    [Language.EN]: [
      `Your request for reconsideration has been received by ${INSTANS.klageinstans.en}.`,
      `${INSTANS.klageinstans.en} will consider your request. You will receive the decision.`,
    ],
  },
  [EventType.OMGJOERINGSKRAV_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} har behandlet omgjøringskravet ditt.`,
      `Du kan lese avgjørelsen i brevet du har fått fra ${INSTANS.klageinstans.nb} i dokumentarkivet.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} har behandla omgjeringskravet ditt.`,
      `Du kan lese avgjerda i brevet du har fått frå ${INSTANS.klageinstans.nn} i dokumentarkivet.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} has processed your request for reconsideration.`,
      `You can read the decision in the letter you have received from ${INSTANS.klageinstans.en} in the document archive.`,
    ],
  },

  [EventType.GJENOPPTAKSBEGJAERING_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `Begjæringen din om gjenopptak er mottatt hos ${INSTANS.klageinstans.nb}.`,
      `Dersom ${INSTANS.klageinstans.nb} ikke endrer det tidligere vedtaket sitt, går saken din videre til ${INSTANS.trygderetten.nb}. Du vil få mulighet til å uttale deg før saken sendes videre til ${INSTANS.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `Kravet ditt om gjenopning er motteke hjå ${INSTANS.klageinstans.nn}.`,
      `Dersom ${INSTANS.klageinstans.nn} ikkje endrar det tidligare vedtaket sitt, går saka di vidare til ${INSTANS.trygderetten.nn}. Du vil få høve til å uttale deg før saka sendast vidare til ${INSTANS.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `Your request for reopening has been received by ${INSTANS.klageinstans.en}.`,
      `If ${INSTANS.klageinstans.en} do not change its previous decision, your case will be sent on to the ${INSTANS.trygderetten.en}. You will have the opportunity to comment before the case is sent on to the ${INSTANS.trygderetten.en}.`,
    ],
  },
  [EventType.GJENOPPTAKSBEGJAERING_SENDT_TRYGDERETTEN]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} har behandlet begjæringen din om gjenopptak, og begjæringen din er sendt videre til ${INSTANS.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} har behandla kravet ditt om gjenopning, og begjæringen din er sendt vidare til ${INSTANS.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} has processed your request for reopening, and your request has been sent on to the ${INSTANS.trygderetten.en}.`,
    ],
  },
  [EventType.GJENOPPTAKSBEGJAERING_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Language.NB]: [`Kjennelse mottatt fra ${INSTANS.trygderetten.nb}.`],
    [Language.NN]: [`Kjennelse mottatt fra ${INSTANS.trygderetten.nn}.`],
    [Language.EN]: [`Decision on reopening received from the ${INSTANS.trygderetten.en}.`],
  },
  [EventType.GJENOPPTAKSBEGJAERING_AVSLUTTET_I_TRYGDERETTEN]: {
    [Language.NB]: [
      `${INSTANS.trygderetten.nb} har behandlet begjæringen din om gjenopptak. Du kan lese avgjørelsen i kjennelsen fra ${INSTANS.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `${INSTANS.trygderetten.nn} har behandla kravet ditt om gjenopning. Du kan lese avgjerda i kjennelsen frå ${INSTANS.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `The ${INSTANS.trygderetten.en} has processed your request for reopening. You can read the decision in the judgment from the ${INSTANS.trygderetten.en}.`,
    ],
  },
  [EventType.GJENOPPTAKSBEGJAERING_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} har behandlet begjæringen din om gjenopptak.`,
      `Du kan lese avgjørelsen i brevet du har fått fra ${INSTANS.klageinstans.nb} i dokumentarkivet.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} har behandla kravet ditt om gjenopning.`,
      `Du kan lese avgjerda i brevet du har fått frå ${INSTANS.klageinstans.nn} i dokumentarkivet.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} has processed your request for reopening.`,
      `You can read the decision in the letter you have received from ${INSTANS.klageinstans.en} in the document archive.`,
    ],
  },
};
