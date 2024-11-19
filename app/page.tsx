import { getKlanker } from '@/lib/api';
import { Box, Heading, VStack } from '@navikt/ds-react';
import {} from '@navikt/ds-react/Page';
import Link from 'next/link';

export default async function Home() {
  const klanker = await getKlanker();

  return (
    <VStack gap="8">
      <Heading level="1" size="large" spacing>
        Mine klager og anker
      </Heading>

      {klanker.map(({ id }) => {
        return (
          <Box key={id} shadow="small" minHeight="200px" padding="8">
            <Link href={`/saker/${id}`}>
              <Heading level="2" size="medium" spacing>
                {id}
              </Heading>
            </Link>
          </Box>
        );
      })}
    </VStack>
  );
}
