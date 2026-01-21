'use client';

import { FilesIcon } from '@navikt/aksel-icons';
import { Button, Tooltip } from '@navikt/ds-react';
import type { Language, Translation } from '@/locales';

interface TrygderettenAddressProps {
  lang: Language;
}

export const TrygderettenAddress = ({ lang }: TrygderettenAddressProps) => (
  <Tooltip content={TOOLTIP[lang]} placement="top">
    <Button
      data-color="neutral"
      variant="tertiary"
      size="medium"
      onClick={() => navigator.clipboard.writeText(TRYGDERTETTEN_ADDRESS)}
      icon={<FilesIcon aria-hidden />}
      iconPosition="right"
      className="flex"
    >
      <address className="whitespace-pre text-left font-ax-font-family font-normal">{TRYGDERTETTEN_ADDRESS}</address>
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
