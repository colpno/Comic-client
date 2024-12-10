import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Typography } from '~/components/index.ts';
import { toSentenceCase } from '~/utils/converters.ts';

interface Props {
  urlParam: string;
  defaultValue?: string;
  onParamChange: (category: string) => void;
}

function MenuLayoutPageTitle({ onParamChange, urlParam, defaultValue }: Props) {
  const [searchParams] = useSearchParams();
  const value = searchParams.get(urlParam) || defaultValue;

  useEffect(() => {
    if (value) onParamChange(value);
  }, [value, onParamChange]);

  if (!value) return null;

  return (
    <Typography component="h2" variant="h4" className="!mb-8 !text-3xl md:!text-4xl">
      {toSentenceCase(value)}
    </Typography>
  );
}

export default MenuLayoutPageTitle;
