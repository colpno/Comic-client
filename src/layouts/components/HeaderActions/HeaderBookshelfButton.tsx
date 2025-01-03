import { PiBooks } from 'react-icons/pi';

import { Button, ButtonAsIconButtonProps } from '~/components/index.ts';
import { ROUTE_HISTORY } from '~/constants/routeConstants';

type Props = Partial<Omit<ButtonAsIconButtonProps, 'children' | 'href' | 'as' | 'title'>>;

function HeaderBookshelfButton(props: Props) {
  return (
    <Button color="inherit" {...props} as="iconButton" href={ROUTE_HISTORY} title="Bookshelves">
      <PiBooks />
    </Button>
  );
}

export default HeaderBookshelfButton;
