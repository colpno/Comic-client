import { Grid2 } from '@mui/material';

import { RankingComicCard } from '~/features/index.ts';
import { Comic } from '~/types/comicType.ts';

interface Props {
  items: Comic[];
}

function RankingPageContent({ items }: Props) {
  return (
    <Grid2 container columnSpacing={2} rowSpacing={{ xs: 2, sm: 3 }}>
      {items.map((comic, index) => (
        <Grid2 size={{ md: 2, sm: 3, xs: 12 }} key={comic.id}>
          <RankingComicCard comic={comic} rank={index + 1} />
        </Grid2>
      ))}
    </Grid2>
  );
}

export default RankingPageContent;
