import { format, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale/nb';

interface DateTimeProps {
  id?: string;
  date: string;
}

const PRETTY_DATETIME_FORMAT = `dd. MMM yyyy 'kl.' HH:mm:ss`;
const PRETTY_DATE_FORMAT = 'dd. MMM yyyy';
const ISO_FORMAT = 'yyyy-MM-ddTHH:mm:ss';

export const DateTime = ({ date, id }: DateTimeProps) => {
  const parsed = parseISO(date);

  if (isZeroTime(parsed)) {
    return (
      <time id={id} dateTime={format(parsed, ISO_FORMAT)}>
        {format(parsed, PRETTY_DATE_FORMAT, { locale: nb })}
      </time>
    );
  }

  return (
    <time id={id} dateTime={format(parsed, ISO_FORMAT)}>
      {format(parsed, PRETTY_DATETIME_FORMAT, { locale: nb })}
    </time>
  );
};

const isZeroTime = (date: Date) =>
  date.getMilliseconds() === 0 && date.getSeconds() === 0 && date.getMinutes() === 0 && date.getHours() === 0;
