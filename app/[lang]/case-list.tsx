import { SakListItem } from '@/app/[lang]/list-item';
import { BrowserDebugLog } from '@/components/browser-debug-log';
import { getSaker } from '@/lib/api';
import { Languages } from '@/locales';
import { Heading, Skeleton, VStack } from '@navikt/ds-react';
import { headers } from 'next/headers';

interface CaseListProps {
  lang: Languages;
}

export const CaseList = async ({ lang }: CaseListProps) => {
  const sakerResponse = await getSaker(await headers());

  const { saker } = sakerResponse;

  return (
    <>
      <BrowserDebugLog label="Saker" value={saker} />
      <Title caseCount={saker.length} lang={lang} />

      <VStack as="ul" gap="4">
        {saker.map((sak, index) => (
          <SakListItem key={`${sak.id}-${index}`} sak={sak} lang={lang} />
        ))}
      </VStack>
    </>
  );
};

interface CaseListLoadingProps {
  lang: Languages;
}

export const CaseListLoading = ({ lang }: CaseListLoadingProps) => (
  <>
    <Title caseCount={0} lang={lang} />

    <VStack as="ul" gap="4">
      <Skeleton variant="rectangle" height={196} width="100%" className="rounded-medium shadow-medium" />
      <Skeleton variant="rectangle" height={196} width="100%" className="rounded-medium shadow-medium" />
      <Skeleton variant="rectangle" height={196} width="100%" className="rounded-medium shadow-medium" />
    </VStack>
  </>
);

const HEADING: Record<Languages, string> = {
  [Languages.NB]: 'Mine klager og anker',
  [Languages.NN]: 'Mine klagar og ankar',
  [Languages.EN]: 'My complaints and appeals',
};

interface TitleProps {
  caseCount: number;
  lang: Languages;
}

const Title = ({ caseCount, lang }: TitleProps) => (
  <Heading level="1" size="large" spacing>
    {HEADING[lang]} ({caseCount})
  </Heading>
);

export default CaseList;
