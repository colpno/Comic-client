import { IoLogOutOutline } from 'react-icons/io5';
import { MdClose, MdOutlinePermIdentity } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Dialog, Popup } from '~/components/index.ts';
import { ROUTE_HOME } from '~/constants/routeConstants.ts';
import { LoginFormValues } from '~/features/forms/validationSchemas.ts';
import { LoginForm } from '~/features/index.ts';
import { useDeviceWatcher, usePopup } from '~/hooks/index.ts';
import { RootState } from '~/libs/redux/store.ts';

function HeaderAccountButton() {
  const { closePopup, open, openPopup, popupRef } = usePopup();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isMobile = useDeviceWatcher() === 'mobile';

  const handleLogout = () => {
    navigate(ROUTE_HOME);
    // TODO: Implement logout logic
  };

  const handleFormSubmit = async (values: LoginFormValues) => {
    // TODO: Implement login logic
    console.log('values:', values);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Button as="iconButton" color="inherit" title="Account" onClick={handleLogout}>
          <IoLogOutOutline />
        </Button>
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
