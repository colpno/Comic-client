import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Typography } from '~/components/index.ts';
import { toSentenceCase } from '~/utils/converters.ts';

interface Props {
  urlParam: string;
  onParamChange: (category: string) => void;
}

function MenuLayoutPageTitle({ onParamChange, urlParam }: Props) {
  const [searchParams] = useSearchParams();
  const titleParam = searchParams.get(urlParam);

  useEffect(() => {
    if (titleParam) onParamChange(titleParam);
  }, [titleParam, onParamChange]);

  if (!titleParam) return null;

  return (
    <Typography component="h2" variant="h4" className="!mb-8 !text-3xl md:!text-4xl">
      {toSentenceCase(titleParam)}
    </Typography>
  );
}

export default MenuLayoutPageTitle;
