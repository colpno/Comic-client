import { Cancel } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';

interface Props {
  onClick: () => void;
}

function TableCancelActionButton(props: Props) {
  return <GridActionsCellItem icon={<Cancel />} label="Cancel" color="inherit" {...props} />;
}

export default TableCancelActionButton;
