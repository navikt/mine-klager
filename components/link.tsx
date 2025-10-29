'use client';

import NextLink from 'next/link';
import { type MetricsContextData, sendMetricEvent } from '@/lib/metrics';

interface MeasuredLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  ref?: React.RefObject<HTMLAnchorElement>;
  context: MetricsContextData;
}

export const MeasuredLink = ({ href, context, ...props }: MeasuredLinkProps) => (
  <NextLink
    {...props}
    href={href}
    onClick={({ button, metaKey }) => {
      if (button !== 0 && button !== 1) {
        return;
      }

      const newTab = button === 1 || metaKey;
      const from = window.location.pathname;
      // biome-ignore lint/style/useNamingConvention: Metric event naming convention
      sendMetricEvent('navigere', 'link', { ...context, href, from, new_tab: newTab.toString() });
    }}
    onKeyDown={({ key, metaKey }) => {
      if (key === 'Enter') {
        const from = window.location.pathname;
        // biome-ignore lint/style/useNamingConvention: Metric event naming convention
        sendMetricEvent('navigere', 'link', { ...context, href, from, new_tab: metaKey.toString() });
      }
    }}
  />
);
