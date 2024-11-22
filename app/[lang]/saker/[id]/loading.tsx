import { HStack, Skeleton } from '@navikt/ds-react';

export default function Loading() {
  return (
    <>
      <Skeleton variant="rounded" height={40} width={200} className="mb-4" />

      <HStack gap="1">
        <Skeleton variant="text" height={24} width="64px" />
        <Skeleton variant="text" height={24} width="64px" />
      </HStack>

      <HStack as="ul" gap="4">
        <Skeleton variant="rounded" height={56} width="250px" />
        <Skeleton variant="rounded" height={56} width="150px" />
      </HStack>
    </>
  );
}
