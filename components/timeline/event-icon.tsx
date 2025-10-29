import { ArrowForwardIcon, GavelIcon, InboxDownIcon, PaperplaneIcon, type ParagraphIcon } from '@navikt/aksel-icons';
import { EventType } from '@/lib/types';

interface EventIconProps {
  type: EventType;
}

export const EventIcon = ({ type }: EventIconProps) => {
  const Icon = EVENT_ICONS[type];

  return (
    <div
      className="after:-translate-x-1/2 after:-z-10 relative z-0 shrink-0 grow-0 after:absolute after:top-10 after:bottom-2 after:left-1/2 after:w-05 after:bg-surface-subtle after:transition-colors after:duration-200 after:content-[''] group-hover:after:bg-surface-hover"
      role="presentation"
      aria-hidden
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-subtle transition-colors duration-200 *:h-6 *:w-fit group-hover:bg-surface-hover">
        <Icon />
      </div>
    </div>
  );
};

const EVENT_ICONS: Readonly<Record<EventType, typeof ParagraphIcon>> = {
  [EventType.KLAGE_MOTTATT_VEDTAKSINSTANS]: PaperplaneIcon,
  [EventType.KLAGE_MOTTATT_KLAGEINSTANS]: InboxDownIcon,
  [EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS]: GavelIcon,
  [EventType.ANKE_MOTTATT_KLAGEINSTANS]: InboxDownIcon,
  [EventType.ANKE_SENDT_TRYGDERETTEN]: ArrowForwardIcon,
  [EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: GavelIcon,
  [EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN]: GavelIcon,
  [EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS]: GavelIcon,
  [EventType.OMGJOERINGSKRAV_MOTTATT_KLAGEINSTANS]: InboxDownIcon,
  [EventType.OMGJOERINGSKRAV_AVSLUTTET_I_KLAGEINSTANS]: GavelIcon,
  [EventType.GJENOPPTAKSBEGJAERING_MOTTATT_KLAGEINSTANS]: InboxDownIcon,
  [EventType.GJENOPPTAKSBEGJAERING_SENDT_TRYGDERETTEN]: ArrowForwardIcon,
  [EventType.GJENOPPTAKSBEGJAERING_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN]: GavelIcon,
  [EventType.GJENOPPTAKSBEGJAERING_AVSLUTTET_I_TRYGDERETTEN]: GavelIcon,
  [EventType.GJENOPPTAKSBEGJAERING_AVSLUTTET_I_KLAGEINSTANS]: GavelIcon,
};
