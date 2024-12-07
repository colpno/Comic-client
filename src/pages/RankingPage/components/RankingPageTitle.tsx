import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Typography } from '~/components/index.ts';
import { RankingPageCategory } from '~/types/pagesTypes.ts';
import { toSentenceCase } from '~/utils/converters.ts';

interface Props {
  onCategoryChange: (category: RankingPageCategory) => void;
}

function RankingPageTitle({ onCategoryChange }: Props) {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';

  useEffect(() => {
    onCategoryChange(category as RankingPageCategory);
  }, [category, onCategoryChange]);

  return (
    <Typography component="h2" variant="h4" className="!mb-8 !text-3xl md:!text-4xl">
      {toSentenceCase(category)}
    </Typography>
  );
}

export default RankingPageTitle;
