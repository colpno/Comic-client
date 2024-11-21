import { GridActionsCellItem } from '@mui/x-data-grid';
import { MdCancel } from 'react-icons/md';

interface Props {
  onClick: () => void;
}

function TableCancelActionButton(props: Props) {
  return <GridActionsCellItem icon={<MdCancel />} label="Cancel" color="inherit" {...props} />;
}

export default TableCancelActionButton;
