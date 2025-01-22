import { Typography } from '~/components/index.ts';
import { Comic } from '~/types/index.ts';

interface Props {
  title: Comic['title'];
  altTitles: Comic['altTitles'];
  status: Comic['status'];
}

function ComicPageDetailsTitle({ title, altTitles, status }: Props) {
  const getComicStatusColor = () => {
    switch (status) {
      case 'ongoing':
      case 'completed':
        return 'success';

      case 'hiatus':
        return 'warning';

      case 'cancelled':
        return 'error';

      default:
        return 'primary';
    }
  };

  return (
    <>
      <div className="flex items-center">
        <Typography variant="h5" className="line-clamp-1" title={title}>
          {title}
        </Typography>
        <Typography variant="body2" color={getComicStatusColor()} className="!ml-2">
          {status}
        </Typography>
      </div>
      {altTitles && (
        <div className="line-clamp-1" title={altTitles.map((title) => title).join('; ')}>
          <Typography variant="body2">{altTitles.map((title) => title).join('; ')}</Typography>
        </div>
      )}
    </>
  );
}

export default ComicPageDetailsTitle;
