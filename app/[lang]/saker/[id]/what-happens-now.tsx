import { DateTime } from '@/components/datetime';
import { RelevantDocuments } from '@/components/relevant-documents';
import { UNIT } from '@/lib/dictionary';
import { EventDocumentType, EventType } from '@/lib/types';
import { CaseType, type Sak, type SakEvent } from '@/lib/types';
import { Language, type Translation } from '@/locales';
import { BodyShort, Box, Heading, Link, VStack } from '@navikt/ds-react';

interface WhatHappensProps {
  lastEvent: SakEvent;
  lang: Language;
  sak: Sak;
}

export const WhatHappensNow = ({ lastEvent, lang, sak }: WhatHappensProps) => {
  const { type, relevantDocuments } = lastEvent;

  const svarbrevDate = relevantDocuments.find(
    (doc) => doc.eventDocumentType === EventDocumentType.SVARBREV,
  )?.archiveDate;

  const hasSvarbrev = svarbrevDate !== undefined;

  return (
    <VStack as="section" data-element="next-event">
      <Heading level="2" size="medium" spacing>
        {NEXT_EVENT_LABEL[lang]}
      </Heading>

      <Box
        borderRadius="medium"
        padding="4"
        background="surface-subtle"
        width="fit-content"
        className="transition-colors duration-200 hover:bg-surface-hover"
      >
        <VStack gap="4">
          <div>
            <NextDescription type={type} lang={lang} hasSvarbrev={hasSvarbrev} />
            {hasSvarbrev ? <SvarbrevInfo date={svarbrevDate} lang={lang} typeId={sak.typeId} /> : null}
          </div>

          <RelevantDocuments relevantDocuments={relevantDocuments} lang={lang} />
        </VStack>
      </Box>
    </VStack>
  );
};

interface NextDescriptionProps {
  type: EventType;
  lang: Language;
  hasSvarbrev: boolean;
}

const NextDescription = ({ type, lang, hasSvarbrev }: NextDescriptionProps) => {
  const texts = PARAGRAPHS[type][lang];

  const lastIndex = hasSvarbrev ? 0 : texts.length - 1;

  return texts.map((text, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: Static arrays
    <BodyShort key={index} size="medium" spacing={hasSvarbrev || index !== lastIndex}>
      {text}
    </BodyShort>
  ));
};

const TRYGDERTETTEN_ADDRESS = `Trygderetten
Postboks 4724 Nydalen
0421 Oslo`;

const TrygderettenAddress = () => (
  <address className="mt-2 whitespace-pre font-font-family">{TRYGDERTETTEN_ADDRESS}</address>
);

const TrygderettenLink = ({ lang }: { lang: Language }) => (
  <Link href={lang === Language.EN ? 'https://trygderetten.no/en' : 'https://trygderetten.no'} target="_blank">
    trygderetten.no
  </Link>
);

const DomstolLink = () => (
  <Link href="https://domstol.no" target="_blank">
    domstol.no
  </Link>
);

const PARAGRAPHS: Record<EventType, Translation<React.ReactNode[]>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Language.NB]: [
      `${UNIT.vedtaksinstans.nb} har mottatt klagen din og vurderer den på nytt.`,
      'Dersom de gir deg medhold, vil du motta et nytt vedtak.',
      `Dersom de ikke gir deg medhold, vil klagen bli sendt videre til ${UNIT.klageinstans.nb}.`,
    ],
    [Language.NN]: [
      `${UNIT.vedtaksinstans.nn} har mottatt klagen din og vurderer den på nytt.`,
      'Dersom dei gir deg medhald, vil du motta eit nytt vedtak.',
      `Dersom dei ikkje gir deg medhald, vil klagen bli send vidare til ${UNIT.klageinstans.nn}.`,
    ],
    [Language.EN]: [
      `${UNIT.vedtaksinstans.en} has received your complaint and is reviewing it.`,
      'If they rule in your favor, you will receive a new decision.',
      `If they do not rule in your favor, the complaint will be sent to ${UNIT.klageinstans.en}.`,
    ],
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `${UNIT.klageinstans.nb} skal behandle klagen din, og vil da vurdere saken din på nytt.`,
      `${UNIT.klageinstans.nb} har tilgang til alle dokumentene i saken din. Dersom ${UNIT.klageinstans.nb} mangler opplysninger, vil de innhente disse.`,
      `Når ${UNIT.klageinstans.nb} er ferdige med behandlingen av klagen din, vil du få avgjørelsen sendt til deg på den måten du har valgt å motta brev fra Nav på.`,
    ],
    [Language.NN]: [
      `${UNIT.klageinstans.nn} skal behandle klagen din, og vil da vurdere saka di på nytt.`,
      `${UNIT.klageinstans.nn} har tilgang til alle dokumenta i saka di. Dersom ${UNIT.klageinstans.nn} manglar opplysningar, vil dei hente inn desse.`,
      `Når ${UNIT.klageinstans.nn} er ferdige med behandlinga av saka di, vil du få avgjerda sendt til deg på den måten du har valgt å motta brev frå Nav på.`,
    ],
    [Language.EN]: [
      `${UNIT.klageinstans.en} will process your complaint and review your case again.`,
      `${UNIT.klageinstans.en} has access to all the documents in your case. If they lack information, they will obtain it.`,
      `When ${UNIT.klageinstans.en} has finished processing your complaint, you will receive the decision in the way you have chosen to receive letters from Nav.`,
    ],
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av klagen din. Du kan lese avgjørelsen i brevet du har fått fra ${UNIT.klageinstans.nb}.`,
      `Hvis du er uenig i avgjørelsen fra ${UNIT.klageinstans.nb}, kan du med noen unntak anke vedtaket. Du kan lese om hvordan å anke og fristen for å anke i vedtaket fra ${UNIT.klageinstans.nb}.`,
    ],
    [Language.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av klagen din. Du kan lese avgjerda i brevet du har fått frå ${UNIT.klageinstans.nn}.`,
      `Dersom du er ueinig i avgjerda fra ${UNIT.klageinstans.nn}, kan du med nokre unntak anke vedtaket. Du kan lese om korleis å anke og fristen for å anke i vedtaket frå ${UNIT.klageinstans.nn}.`,
    ],
    [Language.EN]: [
      `${UNIT.klageinstans.en} has concluded the processing of your complaint. You can read the decision in the letter you received from ${UNIT.klageinstans.en}.`,
      `If you disagree with the decision from ${UNIT.klageinstans.en}, you can appeal the decision with some exceptions. You can read about how to appeal and the deadline for appealing in the decision from ${UNIT.klageinstans.en}.`,
    ],
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `${UNIT.klageinstans.nb} skal behandle anken din.`,
      `${UNIT.klageinstans.nb} har tilgang til alle dokumentene i saken din. Dersom ${UNIT.klageinstans.nb} mangler opplysninger, vil de innhente disse.`,
      `Dersom ${UNIT.klageinstans.nb} ikke endrer det tidligere vedtaket sitt, går saken din videre til ${UNIT.trygderetten.nb}. Du vil få mulighet til å uttale deg før saken sendes videre til ${UNIT.trygderetten.nb}.`,
    ],
    [Language.NN]: [
      `${UNIT.klageinstans.nn} skal behandle anken din.`,
      `${UNIT.klageinstans.nn} har tilgang til alle dokumenta i saka di. Dersom ${UNIT.klageinstans.nn} manglar opplysningar, vil dei hente inn desse.`,
      `Dersom ${UNIT.klageinstans.nn} ikkje endrar det tidligare vedtaket sitt, går saka di vidare til ${UNIT.trygderetten.nn}. Du vil få høve til å uttale deg før saka sendast vidare til ${UNIT.trygderetten.nn}.`,
    ],
    [Language.EN]: [
      `${UNIT.klageinstans.en} will process your appeal.`,
      `${UNIT.klageinstans.en} has access to all the documents in your case. If ${UNIT.klageinstans.en} lack information, they will obtain it.`,
      `If ${UNIT.klageinstans.en} does not change its previous decision, your case will be sent to the ${UNIT.trygderetten.en}. You will have the opportunity to comment before the case is sent to the ${UNIT.trygderetten.en}.`,
    ],
  },
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av anken din uten å sende saken videre til ${UNIT.trygderetten.nb}. Du kan lese avgjørelsen i brevet du har fått fra ${UNIT.klageinstans.nb}.`,
    ],
    [Language.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av anken din uten å sende saka vidare til ${UNIT.trygderetten.nn}. Du kan lese avgjerda i brevet du har fått frå ${UNIT.klageinstans.nb}.`,
    ],
    [Language.EN]: [
      `${UNIT.klageinstans.en} has concluded the processing of your appeal without sending the case on to the ${UNIT.trygderetten.en}. You can read the decision in the letter you received from ${UNIT.klageinstans.en}.`,
    ],
  },
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Language.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av anken din, og anken din er sendt videre til ${UNIT.trygderetten.nb}.`,
      <>
        <span key="tr">
          Du kan sende brev eller dokumenter til {UNIT.trygderetten.nb} via eDialog, som du finner på{' '}
          <TrygderettenLink lang={Language.NB} />, eller i posten til adressen:
        </span>
        <TrygderettenAddress key="address" />
      </>,
    ],
    [Language.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av anken din, og anken din er sendt vidare til ${UNIT.trygderetten.nn}.`,
      <>
        <span key="tr">
          Du kan sende brev eller dokument til {UNIT.trygderetten.nn} via eDialog, som du finn på{' '}
          <TrygderettenLink lang={Language.NN} />, eller i posten til adressa:
        </span>
        <TrygderettenAddress key="address" />
      </>,
    ],
    [Language.EN]: [
      `${UNIT.klageinstans.nn} has concluded the processing of your appeal, and your appeal has been sent on to ${UNIT.trygderetten.en}.`,
      <>
        <span key="tr">
          You can send letters or documents to the {UNIT.trygderetten.en} via eDialog, which you can find at{' '}
          <TrygderettenLink lang={Language.EN} />, or by mail to the address:
        </span>
        <TrygderettenAddress key="address" />
      </>,
    ],
  },
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Language.NB]: [
      `${UNIT.trygderetten.nb} har avgjort anken din.`,
      `Dersom de gir deg medhold, vil du motta et nytt vedtak som ${UNIT.vedtaksinstans.nb} iverksetter.`,
      'Dersom de ikke gir deg medhold, vil du motta en kjennelse som avslutter saken.',
      `Hvis du fortsatt er uenig i kjennelsen fra ${UNIT.trygderetten.nb}, kan du anke til ${UNIT.lagmannsretten.nb}.`,
    ],
    [Language.NN]: [
      `${UNIT.trygderetten.nn} har avgjort anken din.`,
      `Dersom dei gir deg medhald, vil du motta eit nytt vedtak som ${UNIT.vedtaksinstans.nn} set i verk.`,
      'Dersom dei ikkje gir deg medhald, vil du motta ei kjennelse som avsluttar saka.',
      `Om du framleis er ueinig i kjennelsen frå ${UNIT.trygderetten.nn}, kan du anke til ${UNIT.lagmannsretten.nn}.`,
    ],
    [Language.EN]: [
      `The ${UNIT.trygderetten.en} has decided on your appeal.`,
      `If they rule in your favor, you will receive a new decision that ${UNIT.vedtaksinstans.en} will implement.`,
      'If they do not rule in your favor, you will receive a judgment that concludes the case.',
      `If you still disagree with the judgment of the ${UNIT.trygderetten.en}, you can appeal to the ${UNIT.lagmannsretten.en}.`,
    ],
  },
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Language.NB]: [
      `${UNIT.trygderetten.nb} har avsluttet behandlingen av anken din. Du kan lese avgjørelsen i kjennelsen fra ${UNIT.trygderetten.nb}.`,
      <>
        Hvis du er uenig i kjennelsen fra {UNIT.trygderetten.nb}, kan du anke til {UNIT.lagmannsretten.nb}. Du kan lese
        mer om dette på <DomstolLink key="domstol" />.
      </>,
    ],
    [Language.NN]: [
      `${UNIT.trygderetten.nn} har avslutta behandlinga av anken din. Du kan lese avgjerdai kjennelsen frå ${UNIT.trygderetten.nn}.`,
      <>
        Dersom du er ueinig i kjennelsen frå {UNIT.trygderetten.nn}, kan du anke til {UNIT.lagmannsretten.nn}. Du kan
        lese meir om dette på <DomstolLink key="domstol" />.
      </>,
    ],
    [Language.EN]: [
      `The ${UNIT.trygderetten.en} has concluded the processing of your appeal. You can read the decision in the judgment from the ${UNIT.trygderetten.en}.`,
      <>
        If you disagree with the judgment from {UNIT.trygderetten.en}, you can appeal to the {UNIT.lagmannsretten.en}.
        You can read more about this at <DomstolLink key="domstol" />.
      </>,
    ],
  },
  [EventType.OMGJOERINGSKRAV_MOTTATT_KLAGEINSTANS]: {
    [Language.NB]: [
      `${UNIT.klageinstans.nb} skal behandle omgjøringskravet ditt.`,
      `${UNIT.klageinstans.nb} har tilgang til alle dokumentene i saken din. Dersom ${UNIT.klageinstans.nb} mangler opplysninger, vil de innhente disse.`,
      `Når ${UNIT.klageinstans.nb} har vurdert omgjøringskravet ditt, vil du få avgjørelsen sendt til deg på den måten du har valgt å motta brev fra Nav på.`,
    ],
    [Language.NN]: [
      `${UNIT.klageinstans.nn} skal behandle omgjeringskravet ditt.`,
      `${UNIT.klageinstans.nn} har tilgang til alle dokumenta i saka di. Dersom ${UNIT.klageinstans.nn} manglar opplysningar, vil dei hente inn desse.`,
      `Når ${UNIT.klageinstans.nn} har vurdert omgjeringskravet ditt, vil du få avgjerda sendt til deg på den måten du har valgt å motta brev frå Nav på.`,
    ],
    [Language.EN]: [
      `${UNIT.klageinstans.en} will process your request for reconsideration.`,
      `${UNIT.klageinstans.en} has access to all the documents in your case. If they lack information, they will obtain it.`,
      `When ${UNIT.klageinstans.en} has considered your request for reconsideration, you will receive the decision in the way you have chosen to receive letters from Nav.`,
    ],
  },
  [EventType.OMGJOERINGSKRAV_AVSLUTTET_I_KLAGEINSTANS]: {
    [Language.NB]: [
      `${UNIT.klageinstans.nb} har avsluttet behandlingen av omgjøringskravet ditt. Du kan lese avgjørelsen i brevet du har fått fra ${UNIT.klageinstans.nb}.`,
    ],
    [Language.NN]: [
      `${UNIT.klageinstans.nn} har avslutta behandlinga av omgjeringskravet ditt. Du kan lese avgjerda i brevet du har fått frå ${UNIT.klageinstans.nn}.`,
    ],
    [Language.EN]: [
      `${UNIT.klageinstans.en} has concluded the processing of your request for reconsideration. You can read the decision in the letter you received from ${UNIT.klageinstans.en}.`,
    ],
  },
};

interface SvarbrevInfoProps {
  date: string;
  typeId: CaseType;
  lang: Language;
}

const SvarbrevInfo = ({ date, typeId, lang }: SvarbrevInfoProps) => {
  switch (lang) {
    case Language.NB: {
      const term = typeId === CaseType.KLAGE ? 'klagesak' : 'ankesak';

      return (
        <BodyShort>
          Du kan lese mer om gangen i en {term} og få informasjon om {UNIT.klageinstans.nb} sin saksbehandlingstid i
          brevet du fikk fra {UNIT.klageinstans.nb} den <DateTime date={date} lang={lang} />.
        </BodyShort>
      );
    }

    case Language.NN: {
      const term = typeId === CaseType.KLAGE ? 'klagesak' : 'ankesak';

      return (
        <BodyShort>
          Du kan lese meir om gongen i ei {term} og få informasjon om {UNIT.klageinstans.nn} sin saksbehandlingstid i
          brevet du fekk frå {UNIT.klageinstans.nn} den <DateTime date={date} lang={lang} />.
        </BodyShort>
      );
    }

    case Language.EN: {
      const term = typeId === CaseType.KLAGE ? 'a complaint case' : 'an appeal case';

      return (
        <BodyShort>
          You can read more about the process in {term} and get information about {UNIT.klageinstans.en}'s processing
          time in the letter you received from {UNIT.klageinstans.en} on <DateTime date={date} lang={lang} />.
        </BodyShort>
      );
    }
  }
};

const NEXT_EVENT_LABEL: Translation = {
  [Language.NB]: 'Hva skjer nå?',
  [Language.NN]: 'Kva skjer no?',
  [Language.EN]: 'What happens now?',
};
