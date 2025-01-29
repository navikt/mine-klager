import { Disclaimer } from '@/app/[lang]/disclaimer';
import { SakListItem } from '@/app/[lang]/list-item';
import { getSaker } from '@/lib/api';
import { UNIT } from '@/lib/dictionary';
import { Languages, type Translation } from '@/locales';
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

const HEADING: Translation = {
  [Languages.NB]: `Mine klager og anker hos ${UNIT.klageinstans.nb}`,
  [Languages.NN]: `Mine klagar og ankar hos ${UNIT.klageinstans.nn}`,
  [Languages.EN]: `My complaints and appeals with ${UNIT.klageinstans.en}`,
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
