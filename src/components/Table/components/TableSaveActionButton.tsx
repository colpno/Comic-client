import { Save } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';

interface Props {
  onClick: () => void;
}

function TableSaveActionButton(props: Props) {
  return <GridActionsCellItem icon={<Save />} label="Save" color="inherit" {...props} />;
}

export default TableSaveActionButton;
