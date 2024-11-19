import type { DecoratorLocale } from '@navikt/nav-dekoratoren-moduler/ssr';
import '@/app/globals.css';
import { Decorator } from '@/components/decorator';
import { getLanguage } from '@/lib/get-language';

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: DecoratorLocale }>;
}

const RootLayout = async ({ children, params }: Readonly<Props>) => {
  const lang = await getLanguage(params);

  return <Decorator lang={lang}>{children}</Decorator>;
};

export default RootLayout;
