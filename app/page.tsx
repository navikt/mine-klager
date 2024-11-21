import SakerPage from '@/app/[lang]/page';

export default function SakerDefaultPage() {
  return <SakerPage params={Promise.resolve({ lang: 'nb' })} />;
}
