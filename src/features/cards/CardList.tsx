import { Grid2, Grid2Props } from '@mui/material';

/**
 * @param I Item type
 */
interface Props<I> {
  items: I[];
  children: (item: I) => React.ReactNode;
  gridContainerProps?: Grid2Props;
  gridItemProps?: Grid2Props;
}

function CardList<I>({
  items,
  children,
  gridContainerProps: containerProps,
  gridItemProps: itemProps,
}: Props<I>) {
  return (
    <Grid2 {...containerProps} container>
      {items.map((item) => (
        <Grid2 {...itemProps}>{children(item)}</Grid2>
      ))}
    </Grid2>
  );
}

export default CardList;
