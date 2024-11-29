import { CopyButton, HStack, Label, Tooltip } from '@navikt/ds-react';
import { useId } from 'react';

interface InfoItemProps {
  label: string;
  children: string;
}

export const CopyItem = ({ label, children }: InfoItemProps) => {
  const id = useId();

  return (
    <HStack align="center">
      <Label htmlFor={id}>{label}:</Label>

      <Tooltip content="Klikk for å kopiere saksnummeret" placement="top">
        <CopyButton id={id} copyText={children} text={children} size="small" />
      </Tooltip>
    </HStack>
  );
};
