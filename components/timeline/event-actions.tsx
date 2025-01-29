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
const NAV_DOMAIN = isDeployedToProd ? 'https://www.nav.no' : 'https://www.ansatt.dev.nav.no';

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
  <ButtonLink variant="tertiary" href={getEttersendelseLink(sak, lang, caseType)} openInNewTab>
    {ETTERSEND_DOKUMENTASJON[lang]}
  </ButtonLink>
);

const getEttersendelseLink = (sak: Sak, lang: Languages, caseType: CaseTypeEnum) => {
  if (sak.innsendingsytelseId === null) {
    return getNavKlageLink(lang);
  }

  return `${KLANG_DOMAIN}/${lang}/ettersendelse/${caseType}/${sak.innsendingsytelseId}?saksnummer=${sak.saksnummer}`;
};

export const EttersendDokumentasjonKlage: GetEventActionFn = (props) => (
  <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.KLAGE} />
);

export const EttersendDokumentasjonAnke: GetEventActionFn = (props) => (
  <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.ANKE} />
);

export const Appeal: GetEventActionFn = ({ sak, lang }) => (
  <ButtonLink variant="tertiary" href={getAppealLink(sak, lang)} openInNewTab>
    {APPEAL[lang]}
  </ButtonLink>
);

const getAppealLink = (sak: Sak, lang: Languages) => {
  if (sak.innsendingsytelseId === null) {
    return getNavKlageLink(lang);
  }

  return `${KLANG_DOMAIN}/${lang}/anke/${sak.innsendingsytelseId}?saksnummer=${sak.saksnummer}`;
};

const getNavKlageLink = (lang: Languages) => {
  const language = lang === Languages.NB ? '' : `/${lang}`;

  return `${NAV_DOMAIN}/klage${language}`;
};

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
