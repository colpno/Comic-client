import { Grid2 } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { useGetComicQuery } from '~/apis/comicApis.ts';
import { DataFetching } from '~/components/index.ts';
import NotFoundPage from '../ErrorPage/components/NotFoundPage.tsx';
import BackgroundImage from './components/ComicPageBackgroundImage';
import ChapterList from './components/ComicPageChapterSection.tsx';
import Details from './components/ComicPageDetails';
import SideDetails from './components/ComicPageSideDetails';
import Wrapper from './components/ComicPageWrapper.tsx';

function ComicPage() {
  const { comictitle } = useParams();
  const {
    data: comic,
    isFetching,
    isLoading,
  } = useGetComicQuery({
    title: comictitle!,
    _embed: ['cover_art', 'artist', 'author'],
  });

  if (isFetching || isLoading) {
    return <DataFetching />;
  }
  if (!comic) {
    return <NotFoundPage />;
  }

  return (
    <Grid2 container spacing={3} className="relative pb-16 mt-6">
      <BackgroundImage image={comic.coverImageUrl} />
      <Wrapper>
        <Details {...comic} />
      </Wrapper>
      <Wrapper>
        <SideDetails {...comic} />
      </Wrapper>
      <Wrapper>
        <ChapterList {...comic} />
      </Wrapper>
      <Helmet>
        <title>{comic.title} - Comic</title>
      </Helmet>
    </Grid2>
  );
}

export default ComicPage;
