import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { useTableContext } from '~/components/Table/TableContext';

interface Props {
  onClick: () => void;
}

function ToolbarMultipleDeleteButton(props: Props) {
  const { checkboxSelection } = useTableContext();

  if (!checkboxSelection) return null;

  return (
    <IconButton
      aria-label="Delete selected records"
      title="Xoá đa trường"
      color="error"
      size="large"
      {...props}
    >
      <Delete />
    </IconButton>
  );
}

export default ToolbarMultipleDeleteButton;
