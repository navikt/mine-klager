'use client';

import { Tooltip } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import { format, ISO_DATETIME_FORMAT, longFormat, PRETTY_DATE_FORMAT, textFormat } from '@/lib/date';
import type { Language } from '@/locales';

interface DateTimeProps {
  id?: string;
  date: string;
  lang: Language;
}

const CLASSNAME = 'whitespace-nowrap';

export const DateTime = ({ date, id, lang }: DateTimeProps) => {
  const parsed = parseISO(date);
  const iso = format(parsed, ISO_DATETIME_FORMAT, lang);
  const dateOnly = format(parsed, PRETTY_DATE_FORMAT, lang);

  if (isZeroTime(parsed)) {
    return (
      <Tooltip content={dateOnly} describesChild>
        <time id={id} dateTime={iso} className={CLASSNAME}>
          {dateOnly}
        </time>
      </Tooltip>
    );
  }

  return (
    <Tooltip content={longFormat(parsed, lang)} describesChild>
      <time id={id} dateTime={iso} className={CLASSNAME}>
        {dateOnly}
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

  return <time dateTime={format(parsed, ISO_DATETIME_FORMAT, lang)}>{textFormat(parsed, lang)}</time>;
};

const isZeroTime = (date: Date) =>
  date.getMilliseconds() === 0 && date.getSeconds() === 0 && date.getMinutes() === 0 && date.getHours() === 0;
