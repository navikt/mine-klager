import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Button, type ButtonProps } from '@navikt/ds-react';

interface ButtonLinkProps {
  variant: ButtonProps['variant'];
  href: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
}

export const ButtonLink = ({ href, variant, children, openInNewTab = false }: ButtonLinkProps) => (
  // biome-ignore lint/a11y/useSemanticElements: Button as link.
  <Button
    role="link"
    icon={openInNewTab ? <ExternalLinkIcon aria-hidden /> : undefined}
    variant={variant}
    as="a"
    href={href}
    target={openInNewTab ? '_blank' : undefined}
  >
    {children}
  </Button>
);
