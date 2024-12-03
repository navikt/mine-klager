import { Tooltip } from '@navikt/ds-react';
import { format, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale/nb';

interface DateTimeProps {
  id?: string;
  date: string;
}

const PRETTY_DATETIME_FORMAT = `dd. MMM yyyy 'kl.' HH:mm:ss`;
const PRETTY_DATE_FORMAT = 'dd. MMM yyyy';
const ISO_FORMAT = 'yyyy-MM-ddTHH:mm:ss';

const CLASSNAME = 'whitespace-nowrap';

export const DateTime = ({ date, id }: DateTimeProps) => {
  const parsed = parseISO(date);
  const iso = format(parsed, ISO_FORMAT);
  const dateOnly = format(parsed, PRETTY_DATE_FORMAT, { locale: nb });

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
    <Tooltip content={format(parsed, PRETTY_DATETIME_FORMAT, { locale: nb })}>
      <time id={id} dateTime={iso} className={CLASSNAME}>
        {dateOnly}
      </time>
    </Tooltip>
  );
};

const isZeroTime = (date: Date) =>
  date.getMilliseconds() === 0 && date.getSeconds() === 0 && date.getMinutes() === 0 && date.getHours() === 0;
