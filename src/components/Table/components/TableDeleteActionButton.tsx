import { Delete } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';

export interface TableDeleteActionButtonProps {
  onClick: () => void;
}

function TableDeleteActionButton(props: TableDeleteActionButtonProps) {
  return <GridActionsCellItem icon={<Delete />} label="Delete" color="inherit" {...props} />;
}

export default TableDeleteActionButton;
