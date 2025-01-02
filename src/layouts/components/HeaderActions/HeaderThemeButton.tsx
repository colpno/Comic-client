import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { LuSunMoon } from 'react-icons/lu';
import { useSelector } from 'react-redux';

import { Button, ButtonAsButtonProps, Popup, Typography } from '~/components/index.ts';
import { usePopup } from '~/hooks/usePopup.ts';
import { setTheme } from '~/libs/redux/slices/common.ts';
import { RootState, useAppDispatch } from '~/libs/redux/store.ts';
import { Theme } from '~/types/commonTypes.ts';

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

function LightModeButton(props: ButtonAsButtonProps) {
  return (
    <Button
      {...props}
      variant={props.disabled ? 'contained' : 'text'}
      startIcon={<ThemeIcon theme="light" />}
      title="Light mode"
    >
      <Typography>Light</Typography>
    </Button>
  );
}

function DarkModeButton(props: ButtonAsButtonProps) {
  return (
    <Button
      {...props}
      variant={props.disabled ? 'contained' : 'text'}
      startIcon={<ThemeIcon theme="dark" />}
      title="Dark mode"
    >
      <Typography>Dark</Typography>
    </Button>
  );
}

function SystemModeButton(props: ButtonAsButtonProps) {
  return (
    <Button
      {...props}
      variant={props.disabled ? 'contained' : 'text'}
      startIcon={<ThemeIcon theme="system" />}
      title="System preference mode"
    >
      <Typography>System</Typography>
    </Button>
  );
}

function HeaderThemeButton() {
  const theme = useSelector((state: RootState) => state.common.theme);
  const dispatch = useAppDispatch();
  const { closePopup, open, openPopup, popupRef } = usePopup();
  const sharedModeButtonProps: ButtonAsButtonProps = {
    variant: 'text',
    className: '!justify-start !pl-4 !rounded-none',
    disableTextTransform: true,
  };

  const handleThemeChange = (theme: Theme) => () => {
    dispatch(setTheme(theme));
  };

  return (
    <>
      <Button as="iconButton" color="inherit" title="Theme" onClick={openPopup}>
        <ThemeIcon theme={theme} />
      </Button>
      <Popup open={open} onClose={closePopup} anchorEl={popupRef}>
        <div className="flex flex-col p-2">
          <LightModeButton
            {...sharedModeButtonProps}
            disabled={theme === 'light'}
            onClick={handleThemeChange('light')}
          />
          <DarkModeButton
            {...sharedModeButtonProps}
            disabled={theme === 'dark'}
            onClick={handleThemeChange('dark')}
          />
          <SystemModeButton
            {...sharedModeButtonProps}
            disabled={theme === 'system'}
            onClick={handleThemeChange('system')}
          />
        </div>
      </Popup>
    </>
  );
}

export default HeaderThemeButton;
