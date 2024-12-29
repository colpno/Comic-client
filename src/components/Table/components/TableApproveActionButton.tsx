import { MdCheck } from 'react-icons/md';

import TableActionButton, { TableActionButtonProps } from './TableActionButton.tsx';

interface Props extends Omit<TableActionButtonProps, 'label'> {
  label?: string;
}

function TableApproveActionButton({ label = 'Approve', ...props }: Props) {
  return (
    <TableActionButton
      {...props}
      icon={<MdCheck className="text-xl text-green-600" />}
      label={label}
    />
  );
}

export default TableApproveActionButton;
