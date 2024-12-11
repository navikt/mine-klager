import { isLocal } from '@/lib/environment';

export const API_URL = isLocal ? 'https://kabal-api.intern.dev.nav.no/api/innsyn' : 'http://kabal-api/api/innsyn';

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

interface GetSakerResponse {
  saker: Sak[];
}

export const getSaker = async (token: string): Promise<GetSakerResponse> => {
  const res = await fetch(`${API_URL}/saker`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json();
};

export const getSak = async (token: string, id: string): Promise<Sak | undefined> => {
  const { saker } = await getSaker(token);

  return saker.find((sak) => sak.id === id);
};
