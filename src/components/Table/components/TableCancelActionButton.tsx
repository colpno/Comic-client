import { MdClose } from 'react-icons/md';

import TableActionButton, { TableActionButtonProps } from './TableActionButton.tsx';

interface Props extends Omit<TableActionButtonProps, 'label'> {
  label?: string;
}

function TableCancelActionButton({ label = 'Cancel', ...props }: Props) {
  return (
    <TableActionButton
      {...props}
      icon={<MdClose className="text-xl text-primary-300" />}
      label={label}
    />
  );
}

export default TableCancelActionButton;
