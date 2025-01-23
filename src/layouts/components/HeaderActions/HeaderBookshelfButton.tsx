import { FaBookOpen, FaHeart } from 'react-icons/fa6';
import { PiBooks } from 'react-icons/pi';
import { useLocation } from 'react-router-dom';

import { Button, Popup, Typography } from '~/components/index.ts';
import { ROUTE_FOLLOW, ROUTE_HISTORY } from '~/constants/routeConstants';
import { usePopup } from '~/hooks/index.ts';
import { ButtonAsButtonProps, ButtonAsIconButtonProps } from '~/types/index.ts';

function PopupButton(props: Omit<ButtonAsButtonProps, 'href'> & { href: string }) {
  const { pathname } = useLocation();
  const disabled = pathname === props.href;
  return (
    <Button
      disabled={disabled}
      {...props}
      className="!justify-start !pl-4 !rounded-none !items-center"
      disableTextTransform
      variant={disabled ? 'contained' : 'text'}
    />
  );
}

type Props = Partial<Omit<ButtonAsIconButtonProps, 'children' | 'href' | 'as' | 'title'>>;

function HeaderBookshelfButton(props: Props) {
  const { closePopup, open, openPopup, popupRef } = usePopup();

  return (
    <>
      <Button color="inherit" {...props} as="iconButton" title="Bookshelves" onClick={openPopup}>
        <PiBooks />
      </Button>
      <Popup
        anchorEl={popupRef}
        open={open}
        onClose={closePopup}
        position={{ horizontal: 'right' }}
      >
        <div className="flex flex-col p-2 bg-main">
          <PopupButton href={ROUTE_HISTORY} startIcon={<FaBookOpen />}>
            <Typography>Reading history</Typography>
          </PopupButton>
          <PopupButton href={ROUTE_FOLLOW} startIcon={<FaHeart />}>
            <Typography>Following</Typography>
          </PopupButton>
        </div>
      </Popup>
    </>
  );
}

export default HeaderBookshelfButton;
