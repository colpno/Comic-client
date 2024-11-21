import { GridActionsCellItem } from '@mui/x-data-grid';
import { MdDelete } from 'react-icons/md';

interface Props {
  onClick: () => void;
}

function TableDeleteActionButton(props: Props) {
  return <GridActionsCellItem icon={<MdDelete />} label="Delete" color="inherit" {...props} />;
}

export default TableDeleteActionButton;
