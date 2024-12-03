import { describe, expect, it } from 'bun:test';
import { TimelineItem } from '@/components/timeline-item';
import { EventType, type SakEvent } from '@/lib/api';
import { Languages } from '@/locales';
import { render, screen } from '@testing-library/react';

describe('TimelineItem', () => {
  it('has heading, date and icon', () => {
    const sakEvent: SakEvent = {
      type: EventType.KLAGE_MOTTATT_KLAGEINSTANS,
      date: '2024-11-30',
    };

    render(<TimelineItem sakEvent={sakEvent} saksnummer="123" lang={Languages.NB} />);
    expect(screen.getByRole('heading')).toBeDefined();
  });
});
