export const API_URL =
  process.env.NODE_ENV === 'development' ? 'https://kling-api.intern.dev.nav.no' : 'http://kling-api';

const MOCK: boolean = true;

enum KlankeType {
  KLANK = 'klank',
  KLANG = 'klang',
  KLUNK = 'klunk',
}

interface Klanke {
  id: string;
  type: KlankeType;
}

export const getKlanker = async (): Promise<Klanke[]> => {
  if (MOCK) {
    await delay(200);

    return [
      {
        id: '1',
        type: KlankeType.KLANK,
      },
      {
        id: '2',
        type: KlankeType.KLANG,
      },
      {
        id: '3',
        type: KlankeType.KLUNK,
      },
    ];
  }

  const klanker = await fetch(`${API_URL}/klanker`);
  return await klanker.json();
};

export const getKlanke = async (id: string): Promise<Klanke> => {
  if (MOCK) {
    await delay(200);

    return {
      id: '1',
      type: KlankeType.KLANK,
    };
  }

  const klanke = await fetch(`${API_URL}/klanker/${id}`);
  return await klanke.json();
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
