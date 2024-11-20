export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://kabal-api.intern.dev.nav.no/api/innsyn'
    : 'http://kabal-api/api/innsyn';

const MOCK: boolean = false;

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
  sendtTR = 'sendt-tr',
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

const MOCK_SAKER: Sak[] = [
  {
    id: '1',
    typeId: SaksType.KLAGE,
    ytelseId: '123',
    saksnummer: '123',
    innsendingsytelseId: '123',
    events: [],
  },
  {
    id: '2',
    typeId: SaksType.ANKE,
    ytelseId: '123',
    saksnummer: '123',
    innsendingsytelseId: '123',
    events: [],
  },
  {
    id: '3',
    typeId: SaksType.ANKE_I_TRYGDERETTEN,
    ytelseId: '123',
    saksnummer: '123',
    innsendingsytelseId: '123',
    events: [],
  },
];

interface GetSakerResponse {
  active: Sak[];
  finished: Sak[];
}

export const getSaker = async (): Promise<GetSakerResponse> => {
  if (MOCK) {
    await delay(200);

    return { active: MOCK_SAKER, finished: MOCK_SAKER };
  }

  const saker = await fetch(`${API_URL}/saker`);
  return await saker.json();
};

export const getSak = async (id: string): Promise<Sak | undefined> => {
  if (MOCK) {
    await delay(200);

    return MOCK_SAKER.find((s) => s.id === id);
  }

  const sak = await fetch(`${API_URL}/saker/${id}`);
  return await sak.json();
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
