import { getSak } from '@/lib/api';
import { Heading } from '@navikt/ds-react';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Sak({ params }: Props) {
  const { id } = await params;
  const sak = await getSak(id);

  return (
    <>
      <Heading level="1" size="large" spacing>
        Min klage eller anke
      </Heading>

      {JSON.stringify(sak)}
    </>
  );
}
