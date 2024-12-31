import { Typography } from '~/components/index.ts';

interface Props {
  searchValue: string;
}

function SearchPageTitle({ searchValue }: Props) {
  return (
    <Typography variant="h2" className="!mb-6 !font-semibold line-clamp-1" title={searchValue}>
      Search results for '{searchValue}'
    </Typography>
  );
}

export default SearchPageTitle;
