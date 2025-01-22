import { PiBooks } from 'react-icons/pi';

import { Button } from '~/components/index.ts';
import { ROUTE_HISTORY } from '~/constants/routeConstants';
import { ButtonAsIconButtonProps } from '~/types/index.ts';

type Props = Partial<Omit<ButtonAsIconButtonProps, 'children' | 'href' | 'as' | 'title'>>;

function HeaderBookshelfButton(props: Props) {
  return (
    <Button color="inherit" {...props} as="iconButton" href={ROUTE_HISTORY} title="Bookshelves">
      <PiBooks />
    </Button>
  );
}

export default HeaderBookshelfButton;
