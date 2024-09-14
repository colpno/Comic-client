import { Edit } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';

interface Props {
  onClick: () => void;
}

function TableEditActionButton(props: Props) {
  return <GridActionsCellItem icon={<Edit />} label="Edit" color="inherit" {...props} />;
}

export default TableEditActionButton;
