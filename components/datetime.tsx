import { ISO_FORMAT, PRETTY_DATE_FORMAT, format, longFormat } from '@/lib/date';
import type { Languages } from '@/locales';
import { Tooltip } from '@navikt/ds-react';
import { parseISO } from 'date-fns';

interface DateTimeProps {
  id?: string;
  date: string;
  lang: Languages;
}

const CLASSNAME = 'whitespace-nowrap';

export const DateTime = ({ date, id, lang }: DateTimeProps) => {
  const parsed = parseISO(date);
  const iso = format(parsed, ISO_FORMAT, lang);
  const dateOnly = format(parsed, PRETTY_DATE_FORMAT, lang);

  if (isZeroTime(parsed)) {
    return (
      <Tooltip content={dateOnly}>
        <time id={id} dateTime={iso} className={CLASSNAME}>
          {dateOnly}
        </time>
      </Tooltip>
    );
  }

  return (
    <Tooltip content={longFormat(parsed, lang)}>
      <time id={id} dateTime={iso} className={CLASSNAME}>
        {dateOnly}
      </time>
    </Tooltip>
  );
};

const isZeroTime = (date: Date) =>
  date.getMilliseconds() === 0 && date.getSeconds() === 0 && date.getMinutes() === 0 && date.getHours() === 0;
