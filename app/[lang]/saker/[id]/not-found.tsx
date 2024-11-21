import { BodyShort, Heading } from '@navikt/ds-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <Heading size="medium" level="1" spacing>
        Sak ikke funnet
      </Heading>
      <BodyShort spacing>Fant ikke saken du ba om.</BodyShort>
      <BodyShort spacing>
        Gå til <Link href="/">alle saker</Link>.
      </BodyShort>
    </div>
  );
}
