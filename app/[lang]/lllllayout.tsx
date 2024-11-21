import { isLanguage } from '@/locales';
import { notFound } from 'next/navigation';

interface LanguageLayoutProps {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}

export default async function LanguageLayout({ params, children }: LanguageLayoutProps) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    return notFound();
  }

  return children;
}
