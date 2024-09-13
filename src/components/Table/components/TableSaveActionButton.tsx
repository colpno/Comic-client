import { Save } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';

export interface TableSaveActionButtonProps {
  onClick: () => void;
}

function TableSaveActionButton(props: TableSaveActionButtonProps) {
  return <GridActionsCellItem icon={<Save />} label="Save" color="inherit" {...props} />;
}

export default TableSaveActionButton;
