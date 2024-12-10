import { Grid2 } from '@mui/material';

import { NewArrivalsComicCard } from '~/features/index.ts';
import { Comic } from '~/types/comicType.ts';

interface Props {
  items: Comic[];
}

function CompletedPageContent({ items }: Props) {
  return (
    <Grid2 container columnSpacing={2} rowSpacing={{ xs: 2, sm: 3 }}>
      {items.map((comic) => (
        <Grid2 size={{ md: 2.4, sm: 3, xs: 12 }} key={comic.id}>
          <NewArrivalsComicCard {...comic} />
        </Grid2>
      ))}
    </Grid2>
  );
}

export default CompletedPageContent;
