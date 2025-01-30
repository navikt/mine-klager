import { Language } from '@/locales';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Link, type LinkProps } from '@navikt/ds-react';

interface ResourceLinkProps {
  lang: Language;
}

export const TrygderettenLink = ({ lang }: ResourceLinkProps) => (
  <ExternalLink href={lang === Language.EN ? 'https://trygderetten.no/en' : 'https://trygderetten.no'}>
    trygderetten.no
  </ExternalLink>
);

export const DomstolLink = ({ lang }: ResourceLinkProps) => (
  <ExternalLink href={lang === Language.EN ? 'https://domstol.no/en' : 'https://domstol.no'}>domstol.no</ExternalLink>
);

const ExternalLink = ({ children, ...rest }: Omit<LinkProps, 'target'>) => (
  <Link {...rest} target="_blank">
    <span>{children}</span>
    <ExternalLinkIcon width="1em" />
  </Link>
);
