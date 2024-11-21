import { MdOutlinePermIdentity } from 'react-icons/md';

import { Button } from '~/components/index.ts';

export default function HeaderAccountButton() {
  return (
    <Button as="iconButton" color="inherit" title="Account">
      <MdOutlinePermIdentity />
    </Button>
  );
}
