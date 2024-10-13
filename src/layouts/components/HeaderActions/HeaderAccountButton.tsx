import { PermIdentityOutlined } from '@mui/icons-material';

import { Button } from '~/components/index.ts';

export default function HeaderAccountButton() {
  return (
    <Button as="iconButton" title="Account">
      <PermIdentityOutlined />
    </Button>
  );
}
