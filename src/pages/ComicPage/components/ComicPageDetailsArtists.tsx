import { Typography } from '~/components/index.ts';
import { Comic } from '~/types/index.ts';

interface Props {
  artists: Exclude<Comic['artists'], undefined>;
}

function ComicPageDetailsArtists({ artists }: Props) {
  return (
    <div className="flex gap-1" title={artists.map((artist) => artist.name).join(', ')}>
      <Typography variant="subtitle2" className="font-semibold">
        Artists:
      </Typography>
      <div>
        <Typography variant="subtitle2" className="italic line-clamp-1">
          {artists.map((artist) => artist.name).join(', ')}
        </Typography>
      </div>
    </div>
  );
}

export default ComicPageDetailsArtists;
