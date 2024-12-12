interface SuccessResponse<T> {
  ok: true;
  error: undefined;
  value: T;
}
interface ErrorResponse {
  ok: false;
  error: unknown;
  value: undefined;
}

export type ApiResponse<T> = Promise<SuccessResponse<T> | ErrorResponse>;
export class UnauthorizedError extends Error {}

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
  /**
   * DateTime
   * @example 2021-09-01T12:00:00.000
   */
  varsletFrist: string;
  events: SakEvent[];
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
