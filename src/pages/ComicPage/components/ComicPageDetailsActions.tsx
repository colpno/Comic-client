import { useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  useAddFollowMutation,
  useLazyGetFollowQuery,
  useRemoveFollowMutation,
} from '~/apis/followApis.ts';
import { Button } from '~/components/index.ts';
import { getComicReadingRoute } from '~/constants/routeConstants.ts';
import { RootState } from '~/libs/redux/store.ts';
import { Comic } from '~/types/index.ts';

function HeartButton({ comicId }: { comicId: Comic['id'] }) {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [getFollow, { data: follow }] = useLazyGetFollowQuery();
  const [add] = useAddFollowMutation();
  const [remove] = useRemoveFollowMutation();

  const handleDisabledButtonClick = () => {
    toast.info('Please login to follow this comic');
  };

  const handleClick = () => {
    follow ? remove(follow.id) : add(comicId);
  };

  useEffect(() => {
    (async () => {
      if (isLoggedIn) await getFollow({ following: comicId });
    })();
  }, [isLoggedIn, comicId]);

  if (!isLoggedIn) {
    return (
      <Button as="iconButton" onClick={handleDisabledButtonClick}>
        <FaRegHeart color="red" />
      </Button>
    );
  }

  return (
    <Button as="iconButton" onClick={() => handleClick()}>
      {follow ? <FaHeart color="red" /> : <FaRegHeart color="red" />}
    </Button>
  );
}

interface Props {
  title: Comic['title'];
  id: Comic['id'];
}

function ComicPageDetailsActions({ title, id }: Props) {
  return (
    <div className="flex flex-col gap-2 mt-6 lg:mt-auto sm:flex-row">
      <Button variant="contained" color="primary" href={getComicReadingRoute(title, '1')}>
        Read chapter 1
      </Button>
      <div className="ml-auto">
        <HeartButton comicId={id} />
      </div>
    </div>
  );
}

export default ComicPageDetailsActions;
