import { Typography } from '~/components/index.ts';
import { Comic } from '~/types/index.ts';

interface Props {
  authors: Exclude<Comic['authors'], undefined>;
}

function ComicPageDetailsAuthors({ authors }: Props) {
  return (
    <div className="flex gap-1 mt-2" title={authors.map((author) => author.name).join(', ')}>
      <Typography variant="subtitle2" className="font-semibold">
        Authors:
      </Typography>
      <div>
        <Typography variant="subtitle2" className="italic line-clamp-1">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </div>
    </div>
  );
}

export default ComicPageDetailsAuthors;
