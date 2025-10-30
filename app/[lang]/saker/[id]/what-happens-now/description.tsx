import { BodyShort } from '@navikt/ds-react';
import { DomstolLink, TrygderettenLink } from '@/app/[lang]/saker/[id]/what-happens-now/resource-links';
import { TrygderettenAddress } from '@/app/[lang]/saker/[id]/what-happens-now/trygderetten-address';
import { INSTANS } from '@/lib/dictionary';
import { EventType } from '@/lib/types';
import { Language, type Translation } from '@/locales';

interface NextDescriptionProps {
  type: EventType;
  lang: Language;
  hasSvarbrev: boolean;
}

export const NextDescription = ({ type, lang, hasSvarbrev }: NextDescriptionProps) => {
  const texts = PARAGRAPHS[type][lang];

  const lastIndex = hasSvarbrev ? 0 : texts.length - 1;

  return texts.map((text, index) => (
    <BodyShort key={index} size="medium" spacing={hasSvarbrev || index !== lastIndex}>
      {text}
    </BodyShort>
  ));
};

const PARAGRAPHS: Record<EventType, Translation<React.ReactNode[]>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Language.NB]: [
      `${INSTANS.vedtaksinstans.nb} har mottatt klagen din og vurderer den på nytt.`,
      `Dersom ${INSTANS.vedtaksinstans.nb} gir deg medhold, vil du motta et nytt vedtak.`,
      `Dersom ${INSTANS.vedtaksinstans.nb} ikke gir deg medhold, vil klagen bli sendt videre til ${INSTANS.klageinstans.nb}.`,
    ],
    [Language.NN]: [
      `${INSTANS.vedtaksinstans.nn} har mottatt klagen din og vurderer den på nytt.`,
      `Dersom ${INSTANS.vedtaksinstans.nn} gir deg medhald, vil du motta eit nytt vedtak.`,
      `Dersom ${INSTANS.vedtaksinstans.nn} ikkje gir deg medhald, vil klagen bli send vidare til ${INSTANS.klageinstans.nn}.`,
    ],
    [Language.EN]: [
      `${INSTANS.vedtaksinstans.en} has received your complaint and is reviewing it.`,
      `If ${INSTANS.vedtaksinstans.en} rules in your favor, you will receive a new decision.`,
      `If ${INSTANS.vedtaksinstans.en} does not rule in your favor, the complaint will be sent to ${INSTANS.klageinstans.en}.`,
    ],
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} skal behandle klagen din, og vil da vurdere saken din på nytt.`,
      `${INSTANS.klageinstans.nb} har tilgang til alle dokumentene i saken din. Dersom vi mangler opplysninger, vil vi innhente disse.`,
      `Når ${INSTANS.klageinstans.nb} er ferdige med behandlingen av klagen din, vil du få avgjørelsen sendt til deg på den måten du har valgt å motta brev fra Nav på.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} skal behandle klagen din, og vil da vurdere saka di på nytt.`,
      `${INSTANS.klageinstans.nn} har tilgang til alle dokumenta i saka di. Dersom vi manglar opplysningar, vil vi hente inn desse.`,
      `Når ${INSTANS.klageinstans.nn} er ferdige med behandlinga av saka di, vil du få avgjerda sendt til deg på den måten du har valgt å motta brev frå Nav på.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} will process your complaint and review your case again.`,
      `${INSTANS.klageinstans.en} has access to all the documents in your case. If we lack information, we will obtain it.`,
      `When ${INSTANS.klageinstans.en} has finished processing your complaint, you will receive the decision in the way you have chosen to receive letters from Nav.`,
    ],
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} har behandlet klagen din. Du kan lese avgjørelsen i brevet du har fått fra ${INSTANS.klageinstans.nb}.`,
      `Hvis du er uenig i avgjørelsen fra ${INSTANS.klageinstans.nb}, kan du med noen unntak anke vedtaket. Du kan lese om hvordan å anke og fristen for å anke i vedtaket fra ${INSTANS.klageinstans.nb} i dokumentarkivet.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} har behandla klagen din. Du kan lese avgjerda i brevet du har fått frå ${INSTANS.klageinstans.nn}.`,
      `Dersom du er ueinig i avgjerda fra ${INSTANS.klageinstans.nn}, kan du med nokre unntak anke vedtaket. Du kan lese om korleis å anke og fristen for å anke i vedtaket frå ${INSTANS.klageinstans.nn}  i dokumentarkivet.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} has processed your complaint. You can read the decision in the letter you received from ${INSTANS.klageinstans.en}.`,
      `If you disagree with the decision from ${INSTANS.klageinstans.en}, you can appeal the decision with some exceptions. You can read about how to appeal and the deadline for appealing in the decision from ${INSTANS.klageinstans.en} in the document archive.`,
    ],
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} skal behandle anken din.`,
      `${INSTANS.klageinstans.nb} har tilgang til alle dokumentene i saken din. Dersom vi mangler opplysninger, vil vi innhente disse.`,
      `Dersom ${INSTANS.klageinstans.nb} ikke endrer det tidligere vedtaket sitt, går saken din videre til ${INSTANS.trygderetten.nb}. Du vil få mulighet til å uttale deg før saken sendes videre til ${INSTANS.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} skal behandle anken din.`,
      `${INSTANS.klageinstans.nn} har tilgang til alle dokumenta i saka di. Dersom vi manglar opplysningar, vil vi hente inn desse.`,
      `Dersom ${INSTANS.klageinstans.nn} ikkje endrar det tidligare vedtaket sitt, går saka di vidare til ${INSTANS.trygderetten.nn}. Du vil få høve til å uttale deg før saka sendast vidare til ${INSTANS.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} will process your appeal.`,
      `${INSTANS.klageinstans.en} has access to all the documents in your case. If we lack information, we will obtain it.`,
      `If ${INSTANS.klageinstans.en} do not change its previous decision, your case will be sent to the ${INSTANS.trygderetten.en}. You will have the opportunity to comment before the case is sent to the ${INSTANS.trygderetten.en}.`,
    ],
  },
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} har behandlet anken din uten å sende saken videre til ${INSTANS.trygderetten.nb}. Du kan lese avgjørelsen i brevet du har fått fra ${INSTANS.klageinstans.nb} i dokumentarkivet.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} har behandla anken din uten å sende saka vidare til ${INSTANS.trygderetten.nn}. Du kan lese avgjerda i brevet du har fått frå ${INSTANS.klageinstans.nb} i dokumentarkivet.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} has processed your appeal without sending the case on to the ${INSTANS.trygderetten.en}. You can read the decision in the letter you received from ${INSTANS.klageinstans.en} in the document archive.`,
    ],
  },
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} har behandlet anken din, og anken din er sendt videre til ${INSTANS.trygderetten.nb}.`,
      <>
        <span key="tr">
          Du kan sende brev eller dokumenter til {INSTANS.trygderetten.nb} via eDialog, som du finner på{' '}
          <TrygderettenLink lang={Language.NB} />, eller i posten til adressen:
        </span>
        <TrygderettenAddress key="address" lang={Language.NB} />
      </>,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} har behandla anken din, og anken din er sendt vidare til ${INSTANS.trygderetten.nn}.`,
      <>
        <span key="tr">
          Du kan sende brev eller dokument til {INSTANS.trygderetten.nn} via eDialog, som du finn på{' '}
          <TrygderettenLink lang={Language.NN} />, eller i posten til adressa:
        </span>
        <TrygderettenAddress key="address" lang={Language.NN} />
      </>,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.nn} has processed your appeal, and your appeal has been sent on to the ${INSTANS.trygderetten.en}.`,
      <>
        <span key="tr">
          You can send letters or documents to the {INSTANS.trygderetten.en} via eDialog, which you can find at{' '}
          <TrygderettenLink lang={Language.EN} />, or by mail to the address:
        </span>
        <TrygderettenAddress key="address" lang={Language.EN} />
      </>,
    ],
  },
  // TODO: Verify that the user has access to the decision from Trygderetten before referencing the document archive.
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Language.NB]: [
      `${INSTANS.trygderetten.nb} har behandlet anken din. Du kan lese avgjørelsen i kjennelsen fra ${INSTANS.trygderetten.nb}.`,
      <>
        Hvis du er uenig i kjennelsen fra {INSTANS.trygderetten.nb}, kan du anke til {INSTANS.lagmannsretten.nb}. Du kan
        lese mer om dette på <DomstolLink key="domstol" lang={Language.NB} />.
      </>,
    ],
    [Language.NN]: [
      `${INSTANS.trygderetten.nn} har behandla anken din. Du kan lese avgjerda i kjennelsen frå ${INSTANS.trygderetten.nn}.`,
      <>
        Dersom du er ueinig i kjennelsen frå {INSTANS.trygderetten.nn}, kan du anke til {INSTANS.lagmannsretten.nn}. Du
        kan lese meir om dette på <DomstolLink key="domstol" lang={Language.NN} />.
      </>,
    ],
    [Language.EN]: [
      `The ${INSTANS.trygderetten.en} has processed your appeal. You can read the decision in the judgment from the ${INSTANS.trygderetten.en}.`,
      <>
        If you disagree with the judgment from the {INSTANS.trygderetten.en}, you can appeal to the{' '}
        {INSTANS.lagmannsretten.en}. You can read more about this at <DomstolLink key="domstol" lang={Language.EN} />.
      </>,
    ],
  },
  // TODO: Verify that the user has access to the decision from Trygderetten before referencing the document archive.
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Language.NB]: [
      `${INSTANS.trygderetten.nb} har behandlet anken din. Du kan lese avgjørelsen i kjennelsen fra ${INSTANS.trygderetten.nb}.`,
      <>
        Hvis du er uenig i kjennelsen fra {INSTANS.trygderetten.nb}, kan du anke til {INSTANS.lagmannsretten.nb}. Du kan
        lese mer om dette på <DomstolLink key="domstol" lang={Language.NB} />.
      </>,
    ],
    [Language.NN]: [
      `${INSTANS.trygderetten.nn} har behandla anken din. Du kan lese avgjerda i kjennelsen frå ${INSTANS.trygderetten.nn}.`,
      <>
        Dersom du er ueinig i kjennelsen frå {INSTANS.trygderetten.nn}, kan du anke til {INSTANS.lagmannsretten.nn}. Du
        kan lese meir om dette på <DomstolLink key="domstol" lang={Language.NN} />.
      </>,
    ],
    [Language.EN]: [
      `The ${INSTANS.trygderetten.en} has processed your appeal. You can read the decision in the judgment from the ${INSTANS.trygderetten.en}.`,
      <>
        If you disagree with the judgment from the {INSTANS.trygderetten.en}, you can appeal to the{' '}
        {INSTANS.lagmannsretten.en}. You can read more about this at <DomstolLink key="domstol" lang={Language.EN} />.
      </>,
    ],
  },
  [EventType.OMGJOERINGSKRAV_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} skal behandle omgjøringskravet ditt.`,
      `${INSTANS.klageinstans.nb} har tilgang til alle dokumentene i saken din. Dersom vi mangler opplysninger, vil vi innhente disse.`,
      `Når ${INSTANS.klageinstans.nb} har vurdert omgjøringskravet ditt, vil du få avgjørelsen sendt til deg på den måten du har valgt å motta brev fra Nav på.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} skal behandle omgjeringskravet ditt.`,
      `${INSTANS.klageinstans.nn} har tilgang til alle dokumenta i saka di. Dersom vi manglar opplysningar, vil vi hente inn desse.`,
      `Når ${INSTANS.klageinstans.nn} har vurdert omgjeringskravet ditt, vil du få avgjerda sendt til deg på den måten du har valgt å motta brev frå Nav på.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} will process your request for reconsideration.`,
      `${INSTANS.klageinstans.en} has access to all the documents in your case. If we lack information, we will obtain it.`,
      `When ${INSTANS.klageinstans.en} has considered your request for reconsideration, you will receive the decision in the way you have chosen to receive letters from Nav.`,
    ],
  },
  [EventType.OMGJOERINGSKRAV_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} har behandlet omgjøringskravet ditt. Du kan lese avgjørelsen i brevet du har fått fra ${INSTANS.klageinstans.nb} i dokumentarkivet.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} har behandla omgjeringskravet ditt. Du kan lese avgjerda i brevet du har fått frå ${INSTANS.klageinstans.nn} i dokumentarkivet.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} has processed your request for reconsideration. You can read the decision in the letter you received from ${INSTANS.klageinstans.en} in the document archive.`,
    ],
  },
  [EventType.GJENOPPTAKSBEGJAERING_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} skal behandle begjæringen din om gjenopptak.`,
      `${INSTANS.klageinstans.nb} har tilgang til alle dokumentene i saken din. Dersom vi mangler opplysninger, vil vi innhente disse.`,
      `Dersom ${INSTANS.klageinstans.nb} ikke endrer det tidligere vedtaket sitt, går saken din videre til ${INSTANS.trygderetten.nb}. Du vil få mulighet til å uttale deg før saken sendes videre til ${INSTANS.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} skal behandle kravet ditt om gjenopning.`,
      `${INSTANS.klageinstans.nn} har tilgang til alle dokumenta i saka di. Dersom vi manglar opplysningar, vil vi hente inn desse.`,
      `Dersom ${INSTANS.klageinstans.nn} ikkje endrar det tidligare vedtaket sitt, går saka di vidare til ${INSTANS.trygderetten.nn}. Du vil få høve til å uttale deg før saka sendast vidare til ${INSTANS.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} will process your request for reopening.`,
      `${INSTANS.klageinstans.en} has access to all the documents in your case. If we lack information, we will obtain it.`,
      `If ${INSTANS.klageinstans.en} do not change its previous decision, your case will be sent to the ${INSTANS.trygderetten.en}. You will have the opportunity to comment before the case is sent to the ${INSTANS.trygderetten.en}.`,
    ],
  },
  [EventType.GJENOPPTAKSBEGJAERING_SENDT_TRYGDERETTEN]: {
    [Language.NB]: [
      `${INSTANS.klageinstans.nb} har behandlet begjæringen din om gjenopptak, og begjæringen din er sendt videre til ${INSTANS.trygderetten.nb}.`,
      <>
        <span key="tr">
          Du kan sende brev eller dokumenter til {INSTANS.trygderetten.nb} via eDialog, som du finner på{' '}
          <TrygderettenLink lang={Language.NB} />, eller i posten til adressen:
        </span>
        <TrygderettenAddress key="address" lang={Language.NB} />
      </>,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} har behandla kravet ditt om gjenopning, og kravet ditt er sendt vidare til ${INSTANS.trygderetten.nn}.`,
      <>
        <span key="tr">
          Du kan sende brev eller dokument til {INSTANS.trygderetten.nn} via eDialog, som du finn på{' '}
          <TrygderettenLink lang={Language.NN} />, eller i posten til adressa:
        </span>
        <TrygderettenAddress key="address" lang={Language.NN} />
      </>,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} has processed your request for reopening, and your request has been sent on to the ${INSTANS.trygderetten.en}.`,
      <>
        <span key="tr">
          You can send letters or documents to the {INSTANS.trygderetten.en} via eDialog, which you can find at{' '}
          <TrygderettenLink lang={Language.EN} />, or by mail to the address:
        </span>
        <TrygderettenAddress key="address" lang={Language.EN} />
      </>,
    ],
  },
  [EventType.GJENOPPTAKSBEGJAERING_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
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
      `${INSTANS.klageinstans.nb} har behandlet begjæringen din om gjenopptak. Du kan lese avgjørelsen i brevet du har fått fra ${INSTANS.klageinstans.nb} i dokumentarkivet.`,
    ],
    [Language.NN]: [
      `${INSTANS.klageinstans.nn} har behandla kravet ditt om gjenopning. Du kan lese avgjerda i brevet du har fått frå ${INSTANS.klageinstans.nn} i dokumentarkivet.`,
    ],
    [Language.EN]: [
      `${INSTANS.klageinstans.en} has processed your request for reopening. You can read the decision in the letter you received from ${INSTANS.klageinstans.en} in the document archive.`,
    ],
  },
};
