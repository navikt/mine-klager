import { Languages } from '@/locales';
import { ParagraphIcon } from '@navikt/aksel-icons';

export const API_URL =
  // biome-ignore lint/nursery/noProcessEnv: NextJS does not support import.meta.env
  process.env.NODE_ENV === 'development'
    ? 'https://kabal-api.intern.dev.nav.no/api/innsyn'
    : 'http://kabal-api/api/innsyn';

export enum EventType {
  KLAGE_MOTTATT_VEDTAKSINSTANS = 'KLAGE_MOTTATT_VEDTAKSINSTANS',
  KLAGE_MOTTATT_KLAGEINSTANS = 'KLAGE_MOTTATT_KLAGEINSTANS',
  KLAGE_AVSLUTTET_I_KLAGEINSTANS = 'KLAGE_AVSLUTTET_I_KLAGEINSTANS',
  ANKE_MOTTATT_KLAGEINSTANS = 'ANKE_MOTTATT_KLAGEINSTANS',
  ANKE_SENDT_TRYGDERETTEN = 'ANKE_SENDT_TRYGDERETTEN',
  ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN = 'ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN',
  ANKE_AVSLUTTET_I_TRYGDERETTEN = 'ANKE_AVSLUTTET_I_TRYGDERETTEN',
  ANKE_AVSLUTTET_I_KLAGEINSTANS = 'ANKE_AVSLUTTET_I_KLAGEINSTANS',
}

export const EVENT_NAMES: Readonly<Record<EventType, Record<Languages, string>>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Languages.NB]: 'Klage mottatt vedtaksinstans',
    [Languages.NN]: 'Klage mottatt vedtaksinstans',
    [Languages.EN]: 'Complaint received by decision-making body',
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: 'Klage mottatt klageinstans',
    [Languages.NN]: 'Klage mottatt klageinstans',
    [Languages.EN]: 'Complaint received by complaints body',
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: 'Klage avsluttet i klageinstans',
    [Languages.NN]: 'Klage avsluttet i klageinstans',
    [Languages.EN]: 'Complaint concluded by complaints body',
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: 'Anke mottatt klageinstans',
    [Languages.NN]: 'Anke mottatt klageinstans',
    [Languages.EN]: 'Appeal received by complaints body',
  },
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Languages.NB]: 'Anke sendt Trygderetten',
    [Languages.NN]: 'Anke sendt Trygderetten',
    [Languages.EN]: 'Appeal sent to the National Insurance Court',
  },
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Languages.NB]: 'Anke kjennelse mottatt fra Trygderetten',
    [Languages.NN]: 'Anke kjennelse mottatt fra Trygderetten',
    [Languages.EN]: 'Appeal decision received from the National Insurance Court',
  },
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Languages.NB]: 'Anke avsluttet i Trygderetten',
    [Languages.NN]: 'Anke avsluttet i Trygderetten',
    [Languages.EN]: 'Appeal concluded by the National Insurance Court',
  },
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: 'Anke avsluttet i klageinstans',
    [Languages.NN]: 'Anke avsluttet i klageinstans',
    [Languages.EN]: 'Appeal concluded by complaints body',
  },
};

export const EVENT_ICONS: Readonly<Record<EventType, typeof ParagraphIcon>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: ParagraphIcon,
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: ParagraphIcon,
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: ParagraphIcon,
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: ParagraphIcon,
  [EventType.ANKE_SENDT_TRYGDERETTEN]: ParagraphIcon,
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: ParagraphIcon,
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: ParagraphIcon,
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: ParagraphIcon,
};

export const EVENT_DESCRIPTIONS: Readonly<Record<EventType, Record<Languages, string>>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: {
    [Languages.NB]: 'Klage mottatt vedtaksinstans',
    [Languages.NN]: 'Klage mottatt vedtaksinstans',
    [Languages.EN]: 'Complaint received by decision-making body',
  },
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: 'Klage mottatt klageinstans',
    [Languages.NN]: 'Klage mottatt klageinstans',
    [Languages.EN]: 'Complaint received by complaints body',
  },
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: 'Klage avsluttet i klageinstans',
    [Languages.NN]: 'Klage avsluttet i klageinstans',
    [Languages.EN]: 'Complaint concluded by complaints body',
  },
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: {
    [Languages.NB]: 'Anke mottatt klageinstans',
    [Languages.NN]: 'Anke mottatt klageinstans',
    [Languages.EN]: 'Appeal received by complaints body',
  },
  [EventType.ANKE_SENDT_TRYGDERETTEN]: {
    [Languages.NB]: 'Anke sendt Trygderetten',
    [Languages.NN]: 'Anke sendt Trygderetten',
    [Languages.EN]: 'Appeal sent to the National Insurance Court',
  },
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: {
    [Languages.NB]: 'Anke kjennelse mottatt fra Trygderetten',
    [Languages.NN]: 'Anke kjennelse mottatt fra Trygderetten',
    [Languages.EN]: 'Appeal decision received from the National Insurance Court',
  },
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: {
    [Languages.NB]: 'Anke avsluttet i Trygderetten',
    [Languages.NN]: 'Anke avsluttet i Trygderetten',
    [Languages.EN]: 'Appeal concluded by the National Insurance Court',
  },
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: {
    [Languages.NB]: 'Anke avsluttet i klageinstans',
    [Languages.NN]: 'Anke avsluttet i klageinstans',
    [Languages.EN]: 'Appeal concluded by complaints body',
  },
};

export interface SakEvent {
  type: EventType;
  /**
   * DateTime
   * @example 2021-09-01T12:00:00.000
   */
  date: string; // DateTime
}

export interface Sak {
  id: string;
  saksnummer: string;
  ytelseId: string;
  innsendingsytelseId: string;
  events: SakEvent[];
}

interface GetSakerResponse {
  saker: Sak[];
}

export const getSaker = async (): Promise<GetSakerResponse> => {
  const res = await fetch(`${API_URL}/saker`);

  // TODO: Remove delay.
  const data = res.json();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return data;
};

export const getSak = async (id: string): Promise<Sak | undefined> => {
  const { saker } = await getSaker();

  return saker.find((sak) => sak.id === id);
};
