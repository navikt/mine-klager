import '@/app/globals.css';
import { Decorator } from '@/components/decorator';
import { getLanguage, type LanguageParams } from '@/lib/server/get-language';

interface Props {
  children: React.ReactNode;
  params: Promise<LanguageParams>;
}

const RootLayout = async ({ children, params }: Readonly<Props>) => {
  const lang = await getLanguage(params);

  return <Decorator lang={lang}>{children}</Decorator>;
};

export default RootLayout;
