'use client';

import { BodyShort, CopyButton, HStack } from '@navikt/ds-react';

interface ErrorIdProps {
  id: string;
  label: string;
  prefix: string;
}

export const ErrorId = ({ id, label, prefix }: ErrorIdProps) => (
  <HStack align="center" gap="space-2" marginBlock="space-4 space-0">
    <BodyShort size="small" textColor="subtle">
      {label}: {prefix}_{id}
    </BodyShort>
    <CopyButton copyText={`${prefix}_${id}`} size="xsmall" data-color="accent" />
  </HStack>
);
