export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://kabal-api.intern.dev.nav.no/api/innsyn'
    : 'http://kabal-api/api/innsyn';

export enum SaksType {
  KLAGE = 'KLAGE',
  ANKE = 'ANKE',
  ANKE_I_TRYGDERETTEN = 'ANKE_I_TRYGDERETTEN',
  BEHANDLING_ETTER_TRYGDERETTEN_OPPHEVET = 'BEHANDLING_ETTER_TRYGDERETTEN_OPPHEVET',
  OMGJOERINGSKRAV = 'OMGJOERINGSKRAV',
}

export enum EventType {
  MOTTATT_VEDTAKSINSTANS = 'MOTTATT_VEDTAKSINSTANS',
  MOTTATT_KA = 'MOTTATT_KA',
  FERDIG_KA = 'FERDIG_KA',
  SENDT_TR = 'SENDT_TR',
}

interface SakEvent {
  type: EventType;
  /**
   * DateTime
   * @example 2021-09-01T12:00:00.000
   */
  date: string; // DateTime
}

export interface Sak {
  id: string;
  typeId: SaksType;
  saksnummer: string;
  ytelseId: string;
  innsendingsytelseId: string;
  events: SakEvent[];
}

interface GetSakerResponse {
  active: Sak[];
  finished: Sak[];
}

export const getSaker = async (): Promise<GetSakerResponse> => {
  const saker = await fetch(`${API_URL}/saker`);
  return await saker.json();
};

export const getSak = async (id: string): Promise<Sak | undefined> => {
  const { active, finished } = await getSaker();

  return active.find((sak) => sak.id === id) ?? finished.find((sak) => sak.id === id);
};
