import { ArrowCirclepathIcon, ArrowCirclepathReverseIcon, DocPencilIcon, ParagraphIcon } from '@navikt/aksel-icons';
import { CaseType } from '@/lib/types';

interface CaseIconProps {
  typeId: CaseType;
  className?: string;
}

export const CaseIcon = ({ typeId, ...rest }: CaseIconProps): React.ReactElement => {
  switch (typeId) {
    case CaseType.KLAGE:
      return <DocPencilIcon {...rest} aria-hidden />;
    case CaseType.ANKE:
      return <ParagraphIcon {...rest} aria-hidden />;
    case CaseType.OMGJØRING:
      return <ArrowCirclepathIcon {...rest} aria-hidden />;
    case CaseType.GJENOPPTAKSBEGJÆRING:
      return <ArrowCirclepathReverseIcon {...rest} aria-hidden />;
  }
};
