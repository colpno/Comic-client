import { IconButton } from '@mui/material';
import { MdAdd } from 'react-icons/md';

import { useTableContext } from '~/components/Table/TableContext';

interface ToolbarAddButtonProps {
  onClick: () => void;
}

function ToolbarAddButton(props: ToolbarAddButtonProps) {
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
      <MdAdd />
    </IconButton>
  );
}

export default ToolbarAddButton;
