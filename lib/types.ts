export enum BehandlingstidUnitType {
  WEEKS = '1',
  MONTHS = '2',
}

interface VarsletFristDate {
  /**
   * Date
   * @example 2021-09-01
   */
  varsletFrist: string;
}

interface VarsletFristNullUnits extends VarsletFristDate {
  varsletBehandlingstidUnits: null;
  varsletBehandlingstidUnitTypeId: null;
}

export interface VarsletFristUnits extends VarsletFristDate {
  varsletBehandlingstidUnits: number;
  varsletBehandlingstidUnitTypeId: BehandlingstidUnitType;
}

export type Frist = VarsletFristNullUnits | VarsletFristUnits;

export enum EventDocumentType {
  SVARBREV = 'SVARBREV',
}

export interface EventDocument {
  title: string;
  /**
   * LocalDateTime
   * @example 2021-09-01T12:00:00.000
   */
  archiveDate: string; // LocalDateTime
  journalpostId: string | null;
  eventDocumentType: EventDocumentType;
}

export interface SakEvent {
  type: EventType;
  /**
   * DateTime
   * @example 2021-09-01T12:00:00.000
   */
  date: string; // DateTime
  relevantDocuments: EventDocument[];
}

export enum CaseType {
  KLAGE = '1',
  ANKE = '2',
  OMGJØRING = '5',
}

export const CASE_TYPE_NAMES: Record<CaseType, string> = {
  [CaseType.KLAGE]: 'klage',
  [CaseType.ANKE]: 'anke',
  [CaseType.OMGJØRING]: 'omgjøringskrav',
};

export interface Sak {
  id: string;
  typeId: CaseType;
  saksnummer: string;
  ytelseId: string;
  /**
   * Practically impossible for this to be `null`.
   */
  innsendingsytelseId: string | null;
  events: SakEvent[];
  varsletBehandlingstid: Frist | null;
  /**
   * Date
   * @example 2021-09-01
   */
  finishedDate: string | null;
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
  /** Anke i TR-oppgave er opprettet. */
  ANKE_SENDT_TRYGDERETTEN = 'ANKE_SENDT_TRYGDERETTEN',
  ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN = 'ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN',
  /** Anke i TR-oppgave er fullført. */
  ANKE_AVSLUTTET_I_TRYGDERETTEN = 'ANKE_AVSLUTTET_I_TRYGDERETTEN',
  /** Uten at anke i TR-oppgave er opprettet. */
  ANKE_AVSLUTTET_I_KLAGEINSTANS = 'ANKE_AVSLUTTET_I_KLAGEINSTANS',
  OMGJOERINGSKRAV_MOTTATT_KLAGEINSTANS = 'OMGJOERINGSKRAV_MOTTATT_KLAGEINSTANS',
  OMGJOERINGSKRAV_AVSLUTTET_I_KLAGEINSTANS = 'OMGJOERINGSKRAV_AVSLUTTET_I_KLAGEINSTANS',
}
export interface GetSakerResponse {
  saker: Sak[];
}
