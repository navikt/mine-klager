export interface Ytelse {
  id: string;
  navn: string;
}

let ytelser: Ytelse[] = [];

export const getYtelser = async (): Promise<Ytelse[]> => {
  if (ytelser.length > 0) {
    // biome-ignore lint/suspicious/useAwait: Update ytelser in the background.
    updateYtelser();

    return ytelser;
  }

  return updateYtelser();
};

export const getYtelseName = async (id: string): Promise<string> =>
  (await getYtelser()).find((ytelse) => ytelse.id === id)?.navn ?? id;

const updateYtelser = async (): Promise<Ytelse[]> => {
  const res = await fetch('https://klage-kodeverk-api.intern.dev.nav.no/kodeverk/ytelser/simple');
  ytelser = await res.json();
  return ytelser;
};
