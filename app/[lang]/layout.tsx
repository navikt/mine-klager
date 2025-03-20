import type { DecoratorLocale } from '@navikt/nav-dekoratoren-moduler/ssr';
import '@/app/globals.css';
import { Decorator } from '@/components/decorator';
import { getLanguage } from '@/lib/server/get-language';

interface Params {
  lang: DecoratorLocale;
}

interface Props {
  children: React.ReactNode;
  params: Promise<Params>;
}

const RootLayout = async ({ children, params }: Readonly<Props>) => {
  const lang = await getLanguage(params);

  return <Decorator lang={lang}>{children}</Decorator>;
};

export default RootLayout;
