'use client';

import type { AmplitudeContextData } from '@/lib/amplitude/types';
import { sendMetricEvent } from '@/lib/metrics';
import { CopyButton, HStack, Label, Tooltip } from '@navikt/ds-react';
import { useId } from 'react';

interface InfoItemProps {
  label: string;
  tooltip: string;
  children: string;
  context: AmplitudeContextData;
}

export const CopyItem = ({ label, tooltip, children, context }: InfoItemProps) => {
  const id = useId();

  return (
    <HStack align="center">
      <Label htmlFor={id}>{label}:</Label>

      <Tooltip content={tooltip} placement="top" describesChild>
        <CopyButton
          id={id}
          copyText={children}
          text={children}
          size="small"
          onClick={() => {
            sendMetricEvent('copy-case-number', 'copy-item', { ...context });
          }}
        />
      </Tooltip>
    </HStack>
  );
};
