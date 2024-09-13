import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { useTableContext } from '~/contexts/TableContext.ts';

interface Props {
  onClick: () => void;
}

function ToolbarAddButton(props: Props) {
  const { disableAdd } = useTableContext();

  if (disableAdd) return null;

  return (
    <IconButton
      aria-label="Add new record"
      title="Thêm mới"
      color="primary"
      size="large"
      {...props}
    >
      <Add />
    </IconButton>
  );
}

export default ToolbarAddButton;
