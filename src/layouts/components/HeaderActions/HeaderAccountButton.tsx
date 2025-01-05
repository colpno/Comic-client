import { IoLogOutOutline } from 'react-icons/io5';
import { MdClose, MdOutlinePermIdentity } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { Button, Popup } from '~/components/index.ts';
import { LoginFormValues } from '~/features/forms/validationSchemas.ts';
import { LoginForm } from '~/features/index.ts';
import { useDeviceWatcher, usePopup } from '~/hooks/index.ts';
import { login, logout } from '~/libs/redux/slices/authSlice.ts';
import { RootState, useAppDispatch } from '~/libs/redux/store.ts';

function HeaderAccountButton() {
  const { closePopup, open, openPopup, popupRef } = usePopup();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // TODO: Implement logout logic
    dispatch(logout());
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
      <Popup
        open={open}
        onClose={closePopup}
        anchorEl={popupRef}
        anchorOrigin={{ horizontal: 'right' }}
      >
        <Form />
      </Popup>
    </div>
  );
}

export default HeaderAccountButton;

function Form() {
  const dispatch = useAppDispatch();
  const isMobile = useDeviceWatcher() === 'mobile';

  const handleFormSubmit = (values: LoginFormValues) => {
    console.log(values);
    // TODO: Implement login logic

    // dispatch(login());
  };

  if (isMobile) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 px-6 py-10 overflow-y-scroll bg-main">
        <Button as="iconButton" title="Close" className="!absolute top-4 right-4">
          <MdClose size={32} />
        </Button>
        <LoginForm onSubmit={handleFormSubmit} />
      </div>
    );
  }

  return (
    <div className="px-6 pt-6 pb-10 shadow-md dark:shadow-gray-900 border dark:border-gray-800 w-[22rem] rounded-xl bg-main">
      <LoginForm onSubmit={handleFormSubmit} />
    </div>
  );
}
