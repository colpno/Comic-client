import { MdDelete } from 'react-icons/md';

import { Button } from '~/components/index.ts';
import { useTableContext } from '~/components/Table/TableContext';

interface Props {
  onClick: () => void;
}

function ToolbarMultipleDeleteButton(props: Props) {
  const { removable } = useTableContext();

  if (!(typeof removable === 'object' && removable.multiple === true)) return null;

  return (
    <Button title="Delete selected records" color="error" size="large" {...props} as="iconButton">
      <MdDelete />
    </Button>
  );
}

export default ToolbarMultipleDeleteButton;
