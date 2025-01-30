import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Button, type ButtonProps } from '@navikt/ds-react';

interface ButtonLinkProps {
  variant: ButtonProps['variant'];
  href: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
}

export const ButtonLink = ({ href, variant, children, openInNewTab = false }: ButtonLinkProps) => (
  <Button
    // biome-ignore lint/a11y/useSemanticElements: Button as link.
    role="link"
    icon={openInNewTab ? <ExternalLinkIcon aria-hidden /> : undefined}
    variant={variant}
    as="a"
    href={href}
    target={openInNewTab ? '_blank' : undefined}
    iconPosition="right"
  >
    {children}
  </Button>
);
