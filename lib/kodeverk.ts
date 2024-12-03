import { isDeployedToProd } from '@/lib/environment';

export const API_URL = isDeployedToProd
  ? 'http://klage-kodeverk-api/kodeverk'
  : 'https://klage-kodeverk-api.intern.dev.nav.no/kodeverk';

export interface Ytelse {
  id: string;
  navn: string;
}

export const getYtelseName = async (id: string): Promise<string> => {
  const ytelser = await getYtelser();

  return ytelser.find((ytelse) => ytelse.id === id)?.navn ?? id;
};

const getYtelser = async (): Promise<Ytelse[]> => {
  const res = await fetch(`${API_URL}/ytelser/simple`);

  return await res.json();
};
