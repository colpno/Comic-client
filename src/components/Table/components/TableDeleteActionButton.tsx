import { MdDelete } from 'react-icons/md';

import TableActionButton, { TableActionButtonProps } from './TableActionButton.tsx';

interface Props extends Omit<TableActionButtonProps, 'label'> {
  label?: string;
}

function TableDeleteActionButton({ label = 'Delete', ...props }: Props) {
  return (
    <TableActionButton
      {...props}
      icon={<MdDelete className="text-xl text-primary-600" />}
      label={label}
    />
  );
}

export default TableDeleteActionButton;
