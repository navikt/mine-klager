'use client';

import { Tooltip } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import { format, formatFullDate, formatFullDatetime, formatShortDate, ISO_DATETIME_FORMAT } from '@/lib/date';
import type { Language } from '@/locales';

interface DateTimeProps {
  date: string;
  lang: Language;
}

const CLASSNAME = 'whitespace-nowrap';

export const FullDateTime = ({ date, lang }: DateTimeProps) => {
  const parsed = parseISO(date);
  const iso = format(parsed, ISO_DATETIME_FORMAT, lang);
  const displayDate = formatFullDate(parsed, lang);

  if (isZeroTime(parsed)) {
    return (
      <time dateTime={iso} className={CLASSNAME}>
        {displayDate}
      </time>
    );
  }

  return (
    <Tooltip content={formatFullDatetime(parsed, lang)} describesChild>
      <time dateTime={iso} className={CLASSNAME}>
        {displayDate}
      </time>
    </Tooltip>
  );
};

export const ShortDateTime = ({ date, lang }: DateTimeProps) => {
  const parsed = parseISO(date);
  const iso = format(parsed, ISO_DATETIME_FORMAT, lang);
  const displayDate = formatShortDate(parsed, lang);

  if (isZeroTime(parsed)) {
    return (
      <Tooltip content={formatFullDate(parsed, lang)} describesChild>
        <time dateTime={iso} className={CLASSNAME}>
          {displayDate}
        </time>
      </Tooltip>
    );
  }

  return (
    <Tooltip content={formatFullDatetime(parsed, lang)} describesChild>
      <time dateTime={iso} className={CLASSNAME}>
        {displayDate}
      </time>
    </Tooltip>
  );
};

interface SimpleDateProps {
  date: string;
  lang: Language;
}

export const SimpleDate = ({ date, lang }: SimpleDateProps) => {
  const parsed = parseISO(date);

  return <time dateTime={format(parsed, ISO_DATETIME_FORMAT, lang)}>{formatFullDate(parsed, lang)}</time>;
};

const isZeroTime = (date: Date) =>
  date.getMilliseconds() === 0 && date.getSeconds() === 0 && date.getMinutes() === 0 && date.getHours() === 0;
