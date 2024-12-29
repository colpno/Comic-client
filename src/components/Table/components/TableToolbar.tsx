import {
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarProps,
  useGridApiContext,
} from '@mui/x-data-grid';
import { v1 } from 'uuid';

import { cn } from '~/utils/cssUtils.ts';
import { useTableContext } from '../TableContext.ts';
import { TableColsDef } from '../tableType.ts';
import ToolbarAddButton from './ToolbarAddButton.tsx';
import ToolbarMultipleDeleteButton from './ToolbarMultipleDeleteButton.tsx';

export interface TableToolbarProps extends GridToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

function TableToolbar({ setRows, setRowModesModel, className, ...props }: TableToolbarProps) {
  const id = v1();
  const { current } = useGridApiContext();
  const { getSelectedRows } = current;
  const { columns, onRemove } = useTableContext();

  const handleAddClick = () => {
    if (!columns) return;
    const header: TableColsDef[number] = columns[0];
    const editableField = header.editable ? header.field : undefined;

    setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: editableField },
    }));
  };

  const handleMultipleDeleteClick = () => {
    const selectedIds = Array.from(getSelectedRows().keys()) as string[];
    if (selectedIds.length === 0) return;

    setRows((oldRows) => oldRows.filter((row) => !selectedIds.includes(row.id)));
    setRowModesModel((oldModel) => {
      const newModel = { ...oldModel };
      selectedIds.forEach((id) => delete newModel[id]);
      return newModel;
    });
    onRemove?.(selectedIds);
  };

  return (
    <GridToolbarContainer
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center',
        className
      )}
    >
      <div>
        <ToolbarMultipleDeleteButton onClick={() => handleMultipleDeleteClick()} />
        <ToolbarAddButton onClick={() => handleAddClick()} />
      </div>
      <div>
        <GridToolbar {...props} />
      </div>
    </GridToolbarContainer>
  );
}

export default TableToolbar;
