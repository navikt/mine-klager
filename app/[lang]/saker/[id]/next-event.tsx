import { EventType, type SakEvent } from '@/lib/api';
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
        {NEXT_DESCRIPTION[type][lang].map((text) => (
          <BodyShort key={text} size="medium" spacing>
            {text}
          </BodyShort>
        ))}
      </Box>
    </VStack>
  );
};

const NEXT_DESCRIPTION: Record<EventType, Record<Languages, string[]>> = {
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
      'If they do not rule in your favor, the complaint will be sent to the complaints body.',
    ],
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: [
      'Nav klageinstans behandler den klagen din.',
      'Dersom de gir deg medhold, vil du motta et nytt vedtak som Nav vedtaksinstans iverksetter.',
      'Dersom de ikke gir deg medhold, vil du ha muligheten til å anke vedtaket til Trygderetten.',
    ],
    [Languages.NN]: [
      'Nav klageinstans behandlar klagen din.',
      'Dersom dei gir deg medhald, vil du motta eit nytt vedtak som Nav vedtaksinstans set i verk.',
      'Dersom dei ikkje gir deg medhald, vil du ha moglegheita til å anke vedtaket til Trygderetten.',
    ],
    [Languages.EN]: [
      'The complaints body is processing your complaint.',
      'If they rule in your favor, you will receive a new decision that the decision-making body will implement.',
      'If they do not rule in your favor, you will have the opportunity to appeal the decision to the National Insurance Court.',
    ],
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: [
      'Nav klageinstans har avsluttet behandlingen av klagen din.',
      'Dersom de gir deg medhold, vil du motta et nytt vedtak som Nav vedtaksinstans iverksetter.',
      'Dersom de ikke gir deg medhold, vil du ha muligheten til å anke vedtaket til Trygderetten.',
    ],
    [Languages.NN]: [
      'Nav klageinstans har avslutta behandlinga av klagen din.',
      'Dersom dei gir deg medhald, vil du motta eit nytt vedtak som Nav vedtaksinstans set i verk.',
      'Dersom dei ikkje gir deg medhald, vil du ha moglegheita til å anke vedtaket til Trygderetten.',
    ],
    [Languages.EN]: [
      'The complaints body has concluded the processing of your complaint.',
      'If they rule in your favor, you will receive a new decision that the decision-making body will implement.',
      'If they do not rule in your favor, you will have the opportunity to appeal the decision to the National Insurance Court.',
    ],
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: [
      'Nav klageinstans behandler anken din.',
      'Dersom de gir deg medhold, vil du motta et nytt vedtak som Nav vedtaksinstans iverksetter.',
      'Dersom de ikke gir deg medhold, vil anken gå videre til Trygderetten.',
    ],
    [Languages.NN]: [
      'Nav klageinstans behandlar anken din.',
      'Dersom dei gir deg medhald, vil du motta eit nytt vedtak som Nav vedtaksinstans set i verk.',
      'Dersom dei ikkje gir deg medhald, vil anken gå vidare til Trygderetten.',
    ],
    [Languages.EN]: [
      'The complaints body is processing your appeal.',
      'If they rule in your favor, you will receive a new decision that the decision-making body will implement.',
      'If they do not rule in your favor, the appeal will be sent to the National Insurance Court.',
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
      'The complaints body has concluded the processing of your appeal.',
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
