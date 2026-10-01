import type { LanguageParams } from '@/lib/server/get-language';
import { ensureValidLanguage } from '@/lib/server/not-found';

interface Props {
  children: React.ReactNode;
  params: Promise<LanguageParams>;
}

// Validates the language outside the `loading.tsx` Suspense boundary, so invalid languages get a 404 status.
const SakLayout = async ({ children, params }: Readonly<Props>) => {
  await ensureValidLanguage(params);

  return children;
};

export default SakLayout;
