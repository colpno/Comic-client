import {
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarProps,
  useGridApiContext,
} from '@mui/x-data-grid';
import { useId } from 'react';

import ToolbarAddButton from './ToolbarAddButton.tsx';
import ToolbarMultipleDeleteButton from './ToolbarMultipleDeleteButton.tsx';

export interface TableToolbarProps extends GridToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

function TableToolbar({ setRows, setRowModesModel, ...gridToolbarProps }: TableToolbarProps) {
  const id = useId();
  const { current } = useGridApiContext();
  const { getSelectedRows } = current;

  const handleAddClick = () => {
    setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  const handleMultipleDeleteClick = () => {
    const selectedIds = Array.from(getSelectedRows().keys());
    if (selectedIds.length === 0) return;

    setRows((oldRows) => oldRows.filter((row) => !selectedIds.includes(row.id)));
    setRowModesModel((oldModel) => {
      const newModel = { ...oldModel };
      selectedIds.forEach((id) => delete newModel[id]);
      return newModel;
    });
  };

  return (
    <GridToolbarContainer className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center">
      <div>
        <ToolbarMultipleDeleteButton onClick={handleMultipleDeleteClick} />
        <ToolbarAddButton onClick={handleAddClick} />
      </div>
      <div>
        <GridToolbar {...gridToolbarProps} />
      </div>
    </GridToolbarContainer>
  );
}

export default TableToolbar;
