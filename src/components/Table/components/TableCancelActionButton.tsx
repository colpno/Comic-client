import { Cancel } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';

export interface TableCancelCell {
  onClick: () => void;
}

function TableCancelActionButton(props: TableCancelCell) {
  return <GridActionsCellItem icon={<Cancel />} label="Cancel" color="inherit" {...props} />;
}

export default TableCancelActionButton;
