import { CgProfile } from 'react-icons/cg';
import { FaPerson } from 'react-icons/fa6';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdClose, MdOutlinePermIdentity } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useLazyLogoutQuery, useLoginMutation } from '~/apis/authApis.ts';
import { Button, Dialog, Popup, Typography } from '~/components/index.ts';
import { PROTECTED_ROUTES, ROUTE_HOME, ROUTE_PROFILE } from '~/constants/routeConstants.ts';
import { LoginFormValues } from '~/features/forms/validationSchemas.ts';
import { LoginForm } from '~/features/index.ts';
import { useDeviceWatcher, usePopup } from '~/hooks/index.ts';
import { login, logout } from '~/libs/redux/slices/authSlice.ts';
import { RootState, useAppDispatch } from '~/libs/redux/store.ts';
import { ButtonAsButtonProps, ButtonAsIconButtonProps } from '~/types/index.ts';

function HeaderAccountButton() {
  const { closePopup, open, openPopup, popupRef } = usePopup();
  const [loginQuery] = useLoginMutation();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isMobile = useDeviceWatcher() === 'mobile';

  const handleFormSubmit = async (values: LoginFormValues) => {
    try {
      const data = await loginQuery(values).unwrap();
      toast.success('Login successfully');
      dispatch(login(data.accessToken));
      closePopup();
    } catch (error) {}
  };

  return (
    <div>
      {isLoggedIn ? (
        <ForLoggedInUserButton onClick={openPopup} />
      ) : (
        <Button as="iconButton" color="inherit" title="Account" onClick={openPopup}>
          <MdOutlinePermIdentity />
        </Button>
      )}
      {isMobile ? (
        <Dialog variant="container" open={open} fullScreen>
          <MobileForm onClose={closePopup} onSubmit={handleFormSubmit} />
        </Dialog>
      ) : (
        <Popup
          open={open}
          onClose={closePopup}
          anchorEl={popupRef}
          position={{ horizontal: 'right' }}
        >
          <DesktopForm onSubmit={handleFormSubmit} />
        </Popup>
      )}
    </div>
  );
}

export default HeaderAccountButton;

interface DesktopFormProps {
  onSubmit: (values: LoginFormValues) => void;
}

function DesktopForm({ onSubmit }: DesktopFormProps) {
  return (
    <div className="px-6 pt-6 pb-10 shadow-md dark:shadow-gray-900 border dark:border-gray-800 w-[22rem] rounded-xl bg-main">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}

interface MobileFormProps extends Pick<DesktopFormProps, 'onSubmit'> {
  onClose: ReturnType<typeof usePopup>['closePopup'];
}

function MobileForm({ onSubmit, onClose }: MobileFormProps) {
  return (
    <div className="relative h-full px-6 py-10 overflow-y-scroll bg-main text-main">
      <Button as="iconButton" title="Close" className="!absolute top-3 right-3" onClick={onClose}>
        <MdClose size={32} />
      </Button>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
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

function ForLoggedInUserButton({
  onClick,
  ...props
}: Omit<ButtonAsIconButtonProps, 'as' | 'children'>) {
  const { closePopup, open, openPopup, popupRef } = usePopup();
  const [logoutQuery] = useLazyLogoutQuery();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    logoutQuery().then(() => {
      if (PROTECTED_ROUTES.includes(pathname)) {
        navigate(ROUTE_HOME);
      }

      toast.success('Logout successfully');
      dispatch(logout());
    });
  };

  return (
    <>
      <Button
        {...props}
        as="iconButton"
        color="inherit"
        title="Account"
        onClick={openPopup}
        onMouseEnter={openPopup}
      >
        <FaPerson />
      </Button>
      <Popup
        open={open}
        anchorEl={popupRef}
        onClose={closePopup}
        position={{ horizontal: 'right' }}
      >
        <div className="flex flex-col p-2 bg-main">
          <PopupButton
            disabled={pathname === ROUTE_PROFILE}
            href={ROUTE_PROFILE}
            startIcon={<CgProfile />}
            title="Profile"
          >
            <Typography>Profile</Typography>
          </PopupButton>
          <PopupButton onClick={handleLogout} startIcon={<IoLogOutOutline />} title="Logout">
            <Typography>Logout</Typography>
          </PopupButton>
        </div>
      </Popup>
    </>
  );
}
