import { MdEdit } from 'react-icons/md';

import TableActionButton, { TableActionButtonProps } from './TableActionButton.tsx';

interface Props extends Omit<TableActionButtonProps, 'label'> {
  label?: string;
}

function TableEditActionButton({ label = 'Edit', ...props }: Props) {
  return <TableActionButton {...props} icon={<MdEdit className="text-lg" />} label={label} />;
}

export default TableEditActionButton;
