import { isDeployedToProd } from '@/lib/environment';
import type { Sak, SakEvent } from '@/lib/types';
import { Languages, type Translation } from '@/locales';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Button, type ButtonProps } from '@navikt/ds-react';
import type { JSX } from 'react';

export interface EventActionsProps {
  sak: Sak;
  sakEvent: SakEvent;
  lang: Languages;
}

export enum CaseTypeEnum {
  KLAGE = 'klage',
  ANKE = 'anke',
}

interface CaseType {
  caseType: CaseTypeEnum;
}

const KLANG_DOMAIN = isDeployedToProd ? 'https://klage.nav.no' : 'https://klage.intern.dev.nav.no';

interface ButtonLinkProps {
  variant: ButtonProps['variant'];
  href: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
}

const ButtonLink = ({ href, variant, children, openInNewTab = false }: ButtonLinkProps) => (
  // biome-ignore lint/a11y/useSemanticElements: Button as link.
  <Button
    role="link"
    icon={openInNewTab ? <ExternalLinkIcon aria-hidden /> : undefined}
    variant={variant}
    as="a"
    href={href}
    target={openInNewTab ? '_blank' : undefined}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </Button>
);

export type GetEventActionFn = (props: EventActionsProps) => JSX.Element | null;

const EttersendDokumentasjon = ({ sak, lang, caseType }: EventActionsProps & CaseType) => (
  <ButtonLink
    variant="tertiary"
    href={`${KLANG_DOMAIN}/${lang}/ettersendelse/${caseType}/${sak.innsendingsytelseId}?saksnummer=${sak.saksnummer}`}
    openInNewTab
  >
    {ETTERSEND_DOKUMENTASJON[lang]}
  </ButtonLink>
);

export const EttersendDokumentasjonKlage: GetEventActionFn = (props) => (
  <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.KLAGE} />
);

export const EttersendDokumentasjonAnke: GetEventActionFn = (props) => (
  <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.ANKE} />
);

export const Appeal: GetEventActionFn = ({ sak, lang }) => (
  <ButtonLink
    variant="tertiary"
    href={`${KLANG_DOMAIN}/${lang}/anke/${sak.innsendingsytelseId}?saksnummer=${sak.saksnummer}`}
    openInNewTab
  >
    {APPEAL[lang]}
  </ButtonLink>
);

const ETTERSEND_DOKUMENTASJON: Translation = {
  [Languages.NB]: 'Ettersend dokumentasjon',
  [Languages.NN]: 'Ettersend dokumentasjon',
  [Languages.EN]: 'Submit additional documentation',
};

const APPEAL: Translation = {
  [Languages.NB]: 'Send anke på klagevedtak',
  [Languages.NN]: 'Send anke på klagevedtak',
  [Languages.EN]: 'Appeal the complaint decision',
};
