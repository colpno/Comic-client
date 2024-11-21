import { IconButton } from '@mui/material';
import { MdDelete } from 'react-icons/md';

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
      <MdDelete />
    </IconButton>
  );
}

export default ToolbarMultipleDeleteButton;
