import { SakListItem } from '@/app/[lang]/list-item';
import { getSaker } from '@/lib/api';
import { UnauthorizedError } from '@/lib/types';
import { Languages } from '@/locales';
import { Heading, Skeleton, VStack } from '@navikt/ds-react';
import { headers } from 'next/headers';

interface CaseListProps {
  lang: Languages;
}

export const CaseList = async ({ lang }: CaseListProps) => {
  const sakerResponse = await getSaker(await headers());

  if (!sakerResponse.ok) {
    if (sakerResponse.error instanceof UnauthorizedError) {
      return (
        <>
          <h1>Unauthorized</h1>
          <p>{sakerResponse.error.message}</p>
        </>
      );
    }

    return <h1>Something went wrong</h1>;
  }

  const { saker } = sakerResponse.value;

  return (
    <>
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
