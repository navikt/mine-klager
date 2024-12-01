import { SakListItem } from '@/app/[lang]/list-item';
import { getSaker } from '@/lib/api';
import { Languages } from '@/locales';
import { Heading, Skeleton, VStack } from '@navikt/ds-react';

interface CaseListProps {
  lang: Languages;
}

export const CaseList = async ({ lang }: CaseListProps) => {
  const { saker } = await getSaker();

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
      <Skeleton variant="rectangle" height={200} width="100%" className="rounded-medium shadow-medium" />
      <Skeleton variant="rectangle" height={200} width="100%" className="rounded-medium shadow-medium" />
      <Skeleton variant="rectangle" height={200} width="100%" className="rounded-medium shadow-medium" />
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
