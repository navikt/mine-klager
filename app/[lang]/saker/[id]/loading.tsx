import { HStack, Skeleton } from '@navikt/ds-react';

export default function Loading() {
  return (
    <>
      <Skeleton variant="rounded" height={40} width={200} className="mb-4" />

      <HStack gap="space-4">
        <Skeleton variant="text" height={24} width="128px" />
        <Skeleton variant="text" height={24} width="64px" />
      </HStack>

      <HStack as="ul" gap="space-16" marginBlock="space-16 space-0">
        <Skeleton variant="rounded" height={84} width="270px" />
        <Skeleton variant="rounded" height={84} width="250px" />
      </HStack>
    </>
  );
}
