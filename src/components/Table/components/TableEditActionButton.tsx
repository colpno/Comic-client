import { GridActionsCellItem } from '@mui/x-data-grid';
import { MdEdit } from 'react-icons/md';

interface Props {
  onClick: () => void;
}

function TableEditActionButton(props: Props) {
  return <GridActionsCellItem icon={<MdEdit />} label="Edit" color="inherit" {...props} />;
}

export default TableEditActionButton;
