import { Delete } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';

interface Props {
  onClick: () => void;
}

function TableDeleteActionButton(props: Props) {
  return <GridActionsCellItem icon={<Delete />} label="Delete" color="inherit" {...props} />;
}

export default TableDeleteActionButton;
