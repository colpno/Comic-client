import { useRef, useState } from 'react';
import { MdClose, MdOutlinePermIdentity } from 'react-icons/md';

import { Button } from '~/components/index.ts';
import { LoginForm } from '~/features/index.ts';
import { useClickOutside, useDeviceWatcher } from '~/hooks/index.ts';

function HeaderAccountButton() {
  const [showForm, setShowForm] = useState(false);
  const clickOutsideRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(clickOutsideRef, () => setShowForm(false));

  const toggleForm = () => setShowForm((prev) => !prev);

  return (
    <div ref={clickOutsideRef} className="relative">
      <Button as="iconButton" color="inherit" title="Account" onClick={toggleForm}>
        <MdOutlinePermIdentity />
      </Button>
      <Form open={showForm} onClose={toggleForm} />
    </div>
  );
}

export default HeaderAccountButton;

interface FormProps {
  open: boolean;
  onClose: () => void;
}

function Form({ open, onClose }: FormProps) {
  const isMobile = useDeviceWatcher() === 'mobile';

  if (open) {
    document.body.style.overflow = 'hidden';

    if (isMobile) {
      return (
        <div className="fixed top-0 bottom-0 left-0 right-0 px-6 py-10 overflow-y-scroll bg-main">
          <Button
            as="iconButton"
            title="Close"
            onClick={onClose}
            className="!absolute top-4 right-4"
          >
            <MdClose size={32} />
          </Button>
          <LoginForm />
        </div>
      );
    }

    return (
      <div className="absolute right-0 px-6 pt-6 pb-10 shadow-md border w-[22rem] rounded-xl top-full bg-main">
        <LoginForm />
      </div>
    );
  }

  document.body.style.overflow = 'unset';
  return null;
}
