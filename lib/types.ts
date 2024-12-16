export enum BehandlingstidUnitType {
  WEEKS = '1',
  MONTHS = '2',
}

export interface Frist {
  varsletBehandlingstidUnits: number;
  varsletBehandlingstidUnitTypeId: BehandlingstidUnitType;
  /**
   * Date
   * @example 2021-09-01
   */
  varsletFrist: string;
}

export interface SakEvent {
  type: EventType;
  /**
   * DateTime
   * @example 2021-09-01T12:00:00.000
   */
  date: string; // DateTime
  relevantJournalpostId: string | null;
}

export interface Sak {
  id: string;
  saksnummer: string;
  ytelseId: string;
  /**
   * DateTime
   * @example 2021-09-01T12:00:00.000
   */
  events: SakEvent[];
  varsletBehandlingstid: Frist | null;
  /**
   * Date
   * @example 2021-09-01
   */
  mottattKlageinstans: string;
}

export enum Audience {
  KABAL_API = 'kabal-api',
  KODEVERK_API = 'klage-kodeverk-api',
}
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
export interface GetSakerResponse {
  saker: Sak[];
}
