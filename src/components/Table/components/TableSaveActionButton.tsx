import { GridActionsCellItem } from '@mui/x-data-grid';
import { MdSave } from 'react-icons/md';

interface Props {
  onClick: () => void;
}

function TableSaveActionButton(props: Props) {
  return <GridActionsCellItem icon={<MdSave />} label="Save" color="inherit" {...props} />;
}

export default TableSaveActionButton;
