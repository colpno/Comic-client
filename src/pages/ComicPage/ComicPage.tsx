import { Grid2 } from '@mui/material';

import { generateChapters } from '~/database/chapter.ts';
import { generateComics } from '~/database/comics.ts';
import BackgroundImage from './components/ComicPageBackgroundImage';
import ChapterList from './components/ComicPageChapterList';
import Details from './components/ComicPageDetails';
import SideDetails from './components/ComicPageSideDetails';
import Wrapper from './components/ComicPageWrapper.tsx';

const comic = generateComics(1)[0];
const chapters = generateChapters(50);

function ComicPage() {
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
        <ChapterList comic={comic} chapters={chapters} />
      </Wrapper>
    </Grid2>
  );
}

export default ComicPage;
