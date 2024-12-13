import { MdClose, MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { Button } from '~/components/index.ts';

interface AdornmentProps {
  onClick: () => void;
  show?: boolean;
}

export function PasswordAdornment({ onClick, show }: AdornmentProps) {
  return (
    <Button as="iconButton" onClick={onClick}>
      {show ? <MdVisibilityOff size={22} /> : <MdVisibility color="disabled" size={22} />}
    </Button>
  );
}

export function ClearAdornment({ onClick }: AdornmentProps) {
  return (
    <Button as="iconButton" onClick={onClick}>
      <MdClose className="text-main" size={20} />
    </Button>
  );
}
