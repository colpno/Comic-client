import { Grid2 } from '@mui/material';

import { ComicCard } from '~/features/index.ts';
import { Comic } from '~/types/index.ts';

interface Props {
  items: Comic[];
}

function ComicsByGenrePageContent({ items }: Props) {
  return (
    <Grid2 container columnSpacing={2} rowSpacing={3}>
      {items.map((item) => (
        <Grid2 key={item.id} size={{ xs: 4, sm: 3, md: 2 }}>
          <ComicCard {...item} />
        </Grid2>
      ))}
    </Grid2>
  );
}

export default ComicsByGenrePageContent;
