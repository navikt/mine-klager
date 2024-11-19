import { CaseType } from '@/lib/types';
import { ArrowCirclepathIcon, ChatExclamationmarkIcon, ParagraphIcon } from '@navikt/aksel-icons';

interface CaseIconProps {
  typeId: CaseType;
  className?: string;
}

export const CaseIcon = ({ typeId, ...rest }: CaseIconProps) => {
  switch (typeId) {
    case CaseType.KLAGE:
      return <ChatExclamationmarkIcon {...rest} aria-hidden />;
    case CaseType.ANKE:
      return <ParagraphIcon {...rest} aria-hidden />;
    case CaseType.OMGJØRING:
      return <ArrowCirclepathIcon {...rest} aria-hidden />;
    default:
      return null;
  }
};
