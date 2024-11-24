import { BodyShort, Heading } from '@navikt/ds-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Heading size="medium" level="1" spacing>
        Side ikke funnet
      </Heading>
      <BodyShort spacing>Fant ikke siden.</BodyShort>
      <BodyShort spacing>
        Gå til <Link href="/">alle saker</Link>.
      </BodyShort>
    </>
  );
}
