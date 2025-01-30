import { Disclaimer } from '@/app/[lang]/disclaimer';
import { SakListItem } from '@/app/[lang]/list-item';
import { getSaker } from '@/lib/api';
import { UNIT } from '@/lib/dictionary';
import { Language, type Translation } from '@/locales';
import { Heading, Skeleton, VStack } from '@navikt/ds-react';
import { headers } from 'next/headers';

interface CaseListProps {
  lang: Language;
}

export const CaseList = async ({ lang }: CaseListProps) => {
  const sakerResponse = await getSaker(await headers());

  const { saker } = sakerResponse;

  return (
    <>
      <Title caseCount={saker.length} lang={lang} />

      <Disclaimer lang={lang} className="mb-4" />

      <VStack as="ul" gap="4">
        {saker.map((sak, index) => (
          <SakListItem key={`${sak.id}-${index}`} sak={sak} lang={lang} />
        ))}
      </VStack>
    </>
  );
};

interface CaseListLoadingProps {
  lang: Language;
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

const HEADING: Translation = {
  [Language.NB]: `Mine klager og anker hos ${UNIT.klageinstans.nb}`,
  [Language.NN]: `Mine klagar og ankar hos ${UNIT.klageinstans.nn}`,
  [Language.EN]: `My complaints and appeals with ${UNIT.klageinstans.en}`,
};

interface TitleProps {
  caseCount: number;
  lang: Language;
}

const Title = ({ caseCount, lang }: TitleProps) => (
  <Heading level="1" size="large" spacing>
    {HEADING[lang]} ({caseCount})
  </Heading>
);

export default CaseList;
