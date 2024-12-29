import { MdSave } from 'react-icons/md';

import TableActionButton, { TableActionButtonProps } from './TableActionButton.tsx';

interface Props extends Omit<TableActionButtonProps, 'label'> {
  label?: string;
}
function TableSaveActionButton({ label = 'Save', ...props }: Props) {
  return (
    <TableActionButton
      {...props}
      icon={<MdSave className="text-xl text-blue-700" />}
      label={label}
    />
  );
}

export default TableSaveActionButton;
