import { HStack, Label } from '@navikt/ds-react';
import { useId } from 'react';

interface InfoItemProps {
  label: string;
  children: React.ReactNode;
}

export const InfoItem = ({ label, children }: InfoItemProps) => {
  const id = useId();

  return (
    <HStack gap="1">
      <Label htmlFor={id}>{label}:</Label>
      <span id={id}>{children}</span>
    </HStack>
  );
};
