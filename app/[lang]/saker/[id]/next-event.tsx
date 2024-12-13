import { DateTime } from '@/components/datetime';
import { EventType } from '@/lib/types';
import type { SakEvent } from '@/lib/types';
import { Languages } from '@/locales';
import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';

interface NextEventProps {
  lastEvent: SakEvent | undefined;
  lang: Languages;
}

export const NextEvent = ({ lastEvent, lang }: NextEventProps) => {
  if (lastEvent === undefined) {
    return null;
  }

  const { type } = lastEvent;

  return (
    <VStack as="section">
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
        <NextDescription type={type} lang={lang} date={lastEvent.date} />
      </Box>
    </VStack>
  );
};

// TODO replace date with link to svarbrev: https://nav-it.slack.com/archives/G01CTUC8LSU/p1733843246505869
const KlageMottattKlageinstans = (lang: Languages, date: string) => {
  const dateTime = <DateTime date={date} lang={lang} />;

  if (lang === Languages.NB) {
    return (
      <>
        <BodyShort spacing>Nav klageinstans skal behandle klagen din, og vil da vurdere saken din på nytt.</BodyShort>
        <BodyShort spacing>
          Klageinstansen har tilgang til alle dokumentene i saken din. Dersom klageinstansen mangler opplysninger, vil
          de innhente disse.
        </BodyShort>
        <BodyShort spacing>
          Når klageinstansen er ferdige med behandlingen av klagen din, vil du få avgjørelsen sendt til deg på den måten
          du har valgt å motta brev fra Nav på.
        </BodyShort>
        <BodyShort spacing>
          Du kan lese mer om gangen i en klagesak og få informasjon om klageinstansen sin saksbehandlingstid i brevet du
          fikk fra klageinstansen den {dateTime}.
        </BodyShort>
      </>
    );
  }

  if (lang === Languages.NN) {
    return (
      <>
        <BodyShort spacing>Nav klageinstans skal behandle klagen din, og vil da vurdere saka di på nytt.</BodyShort>
        <BodyShort spacing>
          Klageinstansen har tilgang til alle dokumenta i saka di. Dersom klageinstansen manglar opplysningar, vil dei
          hente inn desse.
        </BodyShort>
        <BodyShort spacing>
          Når klageinstansen er ferdige med behandlinga av saka di, vil du få avgjerda sendt til deg på den måten du har
          valgt å motta brev frå Nav på.
        </BodyShort>
        <BodyShort spacing>
          Du kan lese meir om gongen i ei klagesak og få informasjon om klageinstansen si saksbehandlingstid i brevet du
          fekk frå klageinstansen den {dateTime}.
        </BodyShort>
      </>
    );
  }

  if (lang === Languages.EN) {
    return (
      <>
        <BodyShort spacing>Nav Appeals will process your complaint and review your case again.</BodyShort>
        <BodyShort spacing>
          Nav Appeals has access to all the documents in your case. If they lack information, they will obtain it.
        </BodyShort>
        <BodyShort spacing>
          When Nav Appeals has finished processing your complaint, you will receive the decision in the way you have
          chosen to receive letters from Nav.
        </BodyShort>
        <BodyShort spacing>
          You can read more about the process in a complaint case and get information about Nav Appeals's processing
          time in the letter you received from Nav Appeals on {dateTime}.
        </BodyShort>
      </>
    );
  }
};

// TODO replace with link to svarbrev: https://nav-it.slack.com/archives/G01CTUC8LSU/p1733843246505869
const AnkeMottattKlageinstans = (lang: Languages, date: string) => {
  const dateTime = <DateTime date={date} lang={lang} />;

  if (lang === Languages.NB) {
    return (
      <>
        <BodyShort spacing>Nav klageinstans skal behandle anken din.</BodyShort>
        <BodyShort spacing>
          Klageinstansen har tilgang til alle dokumentene i saken din. Dersom klageinstansen mangler opplysninger, vil
          de innhente disse.
        </BodyShort>
        <BodyShort spacing>
          Dersom klageinstansen ikke endrer det tidligere vedtaket sitt, går saken din videre til Trygderetten. Du vil
          få mulighet til å uttale deg før saken sendes videre til Trygderetten.
        </BodyShort>
        <BodyShort spacing>
          Du kan lese mer om gangen i en ankesak og få informasjon om klageinstansen sin saksbehandlingstid i brevet du
          fikk fra klageinstansen den {dateTime}.
        </BodyShort>
      </>
    );
  }

  if (lang === Languages.NN) {
    return (
      <>
        <BodyShort spacing>Nav klageinstans skal behandle anken din.</BodyShort>
        <BodyShort spacing>
          Klageinstansen har tilgang til alle dokumenta i saka di. Dersom klageinstansen manglar opplysningar, vil dei
          hente inn desse.
        </BodyShort>
        <BodyShort spacing>
          Dersom klageinstansen ikkje endrar det tidligare vedtaket sitt, går saka di vidare til Trygderetten. Du vil få
          høve til å uttale deg før saka sendast vidare til Trygderetten.
        </BodyShort>
        <BodyShort spacing>
          Du kan lese meir om gongen i ei ankesak og få informasjon om klageinstansen si saksbehandlingstid i brevet du
          fekk frå klageinstansen den
        </BodyShort>
      </>
    );
  }

  if (lang === Languages.EN) {
    return (
      <>
        <BodyShort spacing>Nav Appeals will process your appeal.</BodyShort>
        <BodyShort spacing>
          Nav Appeals has access to all the documents in your case. If they lack information, they will obtain it.
        </BodyShort>
        <BodyShort spacing>
          If Nav Appeals does not change its previous decision, your case will be sent to the National Insurance Court.
          You will have the opportunity to comment before the case is sent to the National Insurance Court.
        </BodyShort>
        <BodyShort spacing>
          You can read more about the process in an appeal case and get information about Nav Appeals's processing time
          in the letter you received from Nav Appeals on {dateTime}.
        </BodyShort>
      </>
    );
  }
};

type SimpleEvent = Exclude<EventType, EventType.KLAGE_MOTTATT_KLAGEINSTANS | EventType.ANKE_MOTTATT_KLAGEINSTANS>;

const NextDescription = ({ type, lang, date }: { type: EventType; lang: Languages; date: string }) => {
  switch (type) {
    case EventType.KLAGE_MOTTATT_KLAGEINSTANS:
      return KlageMottattKlageinstans(lang, date);
    case EventType.ANKE_MOTTATT_KLAGEINSTANS:
      return AnkeMottattKlageinstans(lang, date);
    case EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS:
    case EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN:
      return null;
    default:
      return (
        <>
          {NEXT_DESCRIPTION[type][lang].map((text) => (
            <BodyShort key={text} size="medium" spacing>
              {text}
            </BodyShort>
          ))}
        </>
      );
  }
};

const NEXT_DESCRIPTION: Record<SimpleEvent, Record<Languages, string[]>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Languages.NB]: [
      'Nav vedtaksinstans har mottatt klagen din og vurderer den på nytt.',
      'Dersom de gir deg medhold, vil du motta et nytt vedtak.',
      'Dersom de ikke gir deg medhold, vil klagen bli sendt videre til Nav klageinstans.',
    ],
    [Languages.NN]: [
      'Nav vedtaksinstans har mottatt klagen din og vurderer den på nytt.',
      'Dersom dei gir deg medhald, vil du motta eit nytt vedtak.',
      'Dersom dei ikkje gir deg medhald, vil klagen bli send vidare til Nav klageinstans.',
    ],
    [Languages.EN]: [
      'The decision-making body has received your complaint and is reviewing it.',
      'If they rule in your favor, you will receive a new decision.',
      'If they do not rule in your favor, the complaint will be sent to Nav Appeals.',
    ],
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: [
      'Nav klageinstans har avsluttet behandlingen av klagen din. Du kan lese avgjørelsen i brevet du har fått fra klageinstansen.',
      'Hvis du er uenig i avgjørelsen fra Nav klageinstans, kan du med noen unntak anke vedtaket. Du kan lese om hvordan å anke og fristen for å anke i vedtaket fra Nav klageinstans.',
    ],
    [Languages.NN]: [
      'Nav klageinstans har avslutta behandlinga av klagen din. Du kan lese avgjerda i brevet du har fått frå klageinstansen.',
      'Dersom du er ueinig i avgjerda fra Nav klageinstans, kan du med nokre unntak anke vedtaket. Du kan lese om korleis å anke og fristen for å anke i vedtaket frå Nav klageinstans.',
    ],
    [Languages.EN]: [
      'Nav Appeals has concluded the processing of your complaint. You can read the decision in the letter you received from Nav Appeals.',
      'If you disagree with the decision from Nav Appeals, you can appeal the decision with some exceptions. You can read about how to appeal and the deadline for appealing in the decision from Nav Appeals.',
    ],
  },
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: [
      'Nav klageinstans har avsluttet behandlingen av anken din.',
      'Dersom de gir deg medhold, vil du motta et nytt vedtak som Nav vedtaksinstans iverksetter.',
      'Dersom de ikke gir deg medhold, vil anken gå videre til Trygderetten.',
    ],
    [Languages.NN]: [
      'Nav klageinstans har avslutta behandlinga av anken din.',
      'Dersom dei gir deg medhald, vil du motta eit nytt vedtak som Nav vedtaksinstans set i verk.',
      'Dersom dei ikkje gir deg medhald, vil anken gå vidare til Trygderetten.',
    ],
    [Languages.EN]: [
      'Nav Appeals has concluded the processing of your appeal.',
      'If they rule in your favor, you will receive a new decision that the decision-making body will implement.',
      'If they do not rule in your favor, the appeal will be sent to the National Insurance Court.',
    ],
  },
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Languages.NB]: [
      'Trygderetten behandler anken din.',
      'Dersom de gir deg medhold, vil du motta et nytt vedtak som Nav vedtaksinstans iverksetter.',
      'Dersom de ikke gir deg medhold, vil du motta en kjennelse som avslutter saken.',
      'Hvis du fortsatt er uenig i Trygderettens kjennelse, kan du anke til lagmannsretten.',
    ],
    [Languages.NN]: [
      'Trygderetten behandlar anken din.',
      'Dersom dei gir deg medhald, vil du motta eit nytt vedtak som Nav vedtaksinstans set i verk.',
      'Dersom dei ikkje gir deg medhald, vil du motta ei kjennelse som avsluttar saka.',
      'Hvis du framleis er ueinig i Trygderettens kjennelse, kan du anke til lagmannsretten.',
    ],
    [Languages.EN]: [
      'The National Insurance Court is processing your appeal.',
      'If they rule in your favor, you will receive a new decision that the decision-making body will implement.',
      'If they do not rule in your favor, you will receive a judgment that concludes the case.',
      'If you still disagree with the judgment of the National Insurance Court, you can appeal to the Court of Appeal.',
    ],
  },
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Languages.NB]: [
      'Trygderetten har avgjort anken din.',
      'Dersom de gir deg medhold, vil du motta et nytt vedtak som Nav vedtaksinstans iverksetter.',
      'Dersom de ikke gir deg medhold, vil du motta en kjennelse som avslutter saken.',
      'Hvis du fortsatt er uenig i Trygderettens kjennelse, kan du anke til lagmannsretten.',
    ],
    [Languages.NN]: [
      'Trygderetten har avgjort anken din.',
      'Dersom dei gir deg medhald, vil du motta eit nytt vedtak som Nav vedtaksinstans set i verk.',
      'Dersom dei ikkje gir deg medhald, vil du motta ei kjennelse som avsluttar saka.',
      'Hvis du framleis er ueinig i Trygderettens kjennelse, kan du anke til lagmannsretten.',
    ],
    [Languages.EN]: [
      'The National Insurance Court has decided on your appeal.',
      'If they rule in your favor, you will receive a new decision that the decision-making body will implement.',
      'If they do not rule in your favor, you will receive a judgment that concludes the case.',
      'If you still disagree with the judgment of the National Insurance Court, you can appeal to the Court of Appeal.',
    ],
  },
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Languages.NB]: [
      'Trygderetten har avsluttet behandlingen av anken din.',
      'Dersom de gir deg medhold, vil du motta et nytt vedtak som Nav vedtaksinstans iverksetter.',
      'Dersom de ikke gir deg medhold, vil du motta en kjennelse som avslutter saken.',
      'Hvis du fortsatt er uenig i Trygderettens kjennelse, kan du anke til lagmannsretten.',
    ],
    [Languages.NN]: [
      'Trygderetten har avslutta behandlinga av anken din.',
      'Dersom dei gir deg medhald, vil du motta eit nytt vedtak som Nav vedtaksinstans set i verk.',
      'Dersom dei ikkje gir deg medhald, vil du motta ei kjennelse som avsluttar saka.',
      'Hvis du framleis er ueinig i Trygderettens kjennelse, kan du anke til lagmannsretten.',
    ],
    [Languages.EN]: [
      'The National Insurance Court has concluded the processing of your appeal.',
      'If they rule in your favor, you will receive a new decision that the decision-making body will implement.',
      'If they do not rule in your favor, you will receive a judgment that concludes the case.',
      'If you still disagree with the judgment of the National Insurance Court, you can appeal to the Court of Appeal.',
    ],
  },
};

const NEXT_EVENT_LABEL: Record<Languages, string> = {
  [Languages.NB]: 'Hva skjer nå?',
  [Languages.NN]: 'Kva skjer no?',
  [Languages.EN]: 'What happens now?',
};
