export const API_URL =
  process.env.NODE_ENV === 'development' ? 'https://kling-api.intern.dev.nav.no' : 'http://kling-api';

const MOCK: boolean = true;

export enum SaksType {
  KLAGE = '1',
  ANKE = '2',
  ANKE_I_TR = '3',
}

enum EventType {
  mottattVedtaksinstans = 'mottatt-vedtaksinstans',
  mottattKA = 'mottatt-ka',
  ferdigKA = 'ferdig-ka',
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
    typeId: SaksType.ANKE_I_TR,
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
