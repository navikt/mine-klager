import { describe, expect, it } from 'bun:test';
import { TimelineItem } from '@app/components/timeline-item';
import { render, screen } from '@app/utils/test-utils';
import { FileIcon } from '@navikt/aksel-icons';

describe('TimelineItem', () => {
  it('has heading, date and icon', () => {
    render(<TimelineItem title="Heading" date="2024-11-30" icon={<FileIcon />} />);
    expect(screen.getByText(/Heading/)).toBeDefined();
    expect(screen.getByText(/30.11.2024/)).toBeDefined();
  });
});
