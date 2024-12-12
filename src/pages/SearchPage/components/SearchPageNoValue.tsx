import { Typography } from '~/components/index.ts';

function SearchPageNoValue() {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Typography className="text-3xl">There is no search value provided.</Typography>
    </div>
  );
}

export default SearchPageNoValue;
