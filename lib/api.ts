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

export const EVENT_NAMES: Readonly<Record<EventType, string>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: 'Klage mottatt vedtaksinstans',
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: 'Klage mottatt klageinstans',
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: 'Klage avsluttet i klageinstans',
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: 'Anke mottatt klageinstans',
  [EventType.ANKE_SENDT_TRYGDERETTEN]: 'Anke sendt Trygderetten',
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: 'Anke kjennelse mottatt fra Trygderetten',
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: 'Anke avsluttet i Trygderetten',
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: 'Anke avsluttet i klageinstans',
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

export const EVENT_DESCRIPTIONS: Readonly<Record<EventType, string>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: 'Klage mottatt vedtaksinstans',
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: 'Klage mottatt klageinstans',
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: 'Klage avsluttet i klageinstans',
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: 'Anke mottatt klageinstans',
  [EventType.ANKE_SENDT_TRYGDERETTEN]: 'Anke sendt Trygderetten',
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: 'Anke kjennelse mottatt fra Trygderetten',
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: 'Anke avsluttet i Trygderetten',
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: 'Anke avsluttet i klageinstans',
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

  return res.json();
};

export const getSak = async (id: string): Promise<Sak | undefined> => {
  const { saker } = await getSaker();

  return saker.find((sak) => sak.id === id);
};
