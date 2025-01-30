'use client';

import type { Language, Translation } from '@/locales';
import { FilesIcon } from '@navikt/aksel-icons';
import { Button, Tooltip } from '@navikt/ds-react';

interface TrygderettenAddressProps {
  lang: Language;
}

export const TrygderettenAddress = ({ lang }: TrygderettenAddressProps) => (
  <Tooltip content={TOOLTIP[lang]} placement="top">
    <Button
      variant="tertiary-neutral"
      size="medium"
      onClick={() => navigator.clipboard.writeText(TRYGDERTETTEN_ADDRESS)}
      icon={<FilesIcon aria-hidden />}
      iconPosition="right"
      className="flex"
    >
      <address className="whitespace-pre text-left font-font-family font-normal">{TRYGDERTETTEN_ADDRESS}</address>
    </Button>
  </Tooltip>
);

const TRYGDERTETTEN_ADDRESS = `Trygderetten
Postboks 4724 Nydalen
0421 Oslo`;

const TOOLTIP: Translation = {
  nb: 'Klikk for å kopiere adressen',
  nn: 'Klikk for å kopiere adressen',
  en: 'Click to copy the address',
};
