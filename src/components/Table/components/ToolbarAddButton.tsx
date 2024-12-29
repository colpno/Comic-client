import { MdAdd } from 'react-icons/md';

import { Button } from '~/components/index.ts';
import { useTableContext } from '~/components/Table/TableContext';

interface ToolbarAddButtonProps {
  onClick: () => void;
}

function ToolbarAddButton(props: ToolbarAddButtonProps) {
  const { addable } = useTableContext();

  if (!addable) return null;

  return (
    <Button title="Add new record" color="primary" size="large" {...props} as="iconButton">
      <MdAdd />
    </Button>
  );
}

export default ToolbarAddButton;
