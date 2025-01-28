import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { LuSunMoon } from 'react-icons/lu';
import { useSelector } from 'react-redux';

import { Button, Popup, Typography } from '~/components/index.ts';
import { usePopup } from '~/hooks/index.ts';
import { setTheme } from '~/libs/redux/slices/commonSlice';
import { RootState, useAppDispatch } from '~/libs/redux/store.ts';
import { ButtonAsButtonProps, Theme } from '~/types/index.ts';

function ThemeIcon({ theme }: { theme: Theme }) {
  switch (theme) {
    case 'light':
      return <IoSunnyOutline />;
    case 'dark':
      return <IoMoonOutline />;
    case 'system':
      return <LuSunMoon />;
    default:
      return null;
  }
}

function PopupButton(props: ButtonAsButtonProps) {
  return (
    <Button
      {...props}
      className="!justify-start !pl-4 !rounded-none !items-center"
      disableTextTransform
      variant={props.disabled ? 'contained' : 'text'}
    />
  );
}

function HeaderThemeButton() {
  const theme = useSelector((state: RootState) => state.common.theme);
  const dispatch = useAppDispatch();
  const { closePopup, open, openPopup, popupRef } = usePopup();

  const handleThemeChange = (theme: Theme) => () => {
    dispatch(setTheme(theme));
  };

  return (
    <>
      <Button
        as="iconButton"
        color="inherit"
        title="Theme"
        onClick={openPopup}
        onMouseEnter={openPopup}
      >
        <ThemeIcon theme={theme} />
      </Button>
      <Popup
        open={open}
        onClose={closePopup}
        anchorEl={popupRef}
        position={{ horizontal: 'right' }}
      >
        <div className="flex flex-col p-2 bg-main">
          <PopupButton
            disabled={theme === 'light'}
            onClick={handleThemeChange('light')}
            startIcon={<ThemeIcon theme="light" />}
            title="Light mode"
          >
            <Typography>Light</Typography>
          </PopupButton>
          <PopupButton
            disabled={theme === 'dark'}
            onClick={handleThemeChange('dark')}
            startIcon={<ThemeIcon theme="dark" />}
            title="Dark mode"
          >
            <Typography>Dark</Typography>
          </PopupButton>
          <PopupButton
            disabled={theme === 'system'}
            onClick={handleThemeChange('system')}
            startIcon={<ThemeIcon theme="system" />}
            title="System preference mode"
          >
            <Typography>System</Typography>
          </PopupButton>
        </div>
      </Popup>
    </>
  );
}

export default HeaderThemeButton;
