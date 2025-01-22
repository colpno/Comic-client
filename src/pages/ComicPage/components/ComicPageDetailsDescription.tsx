import { Typography } from '~/components/index.ts';
import { Comic } from '~/types/index.ts';

interface Props {
  content: Comic['description'];
}

function ComicPageDetailsDescription({ content }: Props) {
  const description = content?.replace(/\n+/g, '\n');
  return (
    <Typography className="!mt-4 line-clamp-3" title={description}>
      {description}
    </Typography>
  );
}

export default ComicPageDetailsDescription;
