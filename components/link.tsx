'use client';
import type { AmplitudeContextData } from '@/lib/amplitude/types';
import { sendMetricEvent } from '@/lib/metrics';
import NextLink from 'next/link';

interface MeasuredLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  ref?: React.RefObject<HTMLAnchorElement>;
  context: AmplitudeContextData;
}

export const MeasuredLink = ({ href, context, ...props }: MeasuredLinkProps) => (
  <NextLink
    {...props}
    href={href}
    onClick={({ button, metaKey }) => {
      if (button !== 0 && button !== 1) {
        return;
      }

      const new_tab = button === 1 || metaKey;
      const from = window.location.pathname;
      sendMetricEvent('navigere', 'link', { ...context, href, from, new_tab: new_tab.toString() });
    }}
    onKeyDown={({ key, metaKey }) => {
      if (key === 'Enter') {
        const from = window.location.pathname;
        sendMetricEvent('navigere', 'link', { ...context, href, from, new_tab: metaKey.toString() });
      }
    }}
  />
);
