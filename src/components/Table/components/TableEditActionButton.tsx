import { Edit } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';

export interface TableEditActionButtonProps {
  onClick: () => void;
}

function TableEditActionButton(props: TableEditActionButtonProps) {
  return <GridActionsCellItem icon={<Edit />} label="Edit" color="inherit" {...props} />;
}

export default TableEditActionButton;
