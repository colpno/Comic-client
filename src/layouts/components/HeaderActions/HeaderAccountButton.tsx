import { PermIdentityOutlined } from '@mui/icons-material';

import { Button } from '~/components/index.ts';

export default function HeaderAccountButton() {
  return (
    <Button as="iconButton" color="inherit" title="Account">
      <PermIdentityOutlined />
    </Button>
  );
}
