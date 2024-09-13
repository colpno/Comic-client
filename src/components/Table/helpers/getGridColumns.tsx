import {
  GridActionsColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
} from '@mui/x-data-grid';

import TableCancelActionButton from '../components/TableCancelActionButton.tsx';
import TableDeleteActionButton from '../components/TableDeleteActionButton.tsx';
import TableEditActionButton from '../components/TableEditActionButton.tsx';
import TableSaveActionButton from '../components/TableSaveActionButton.tsx';

export interface GetActionsCell {
  rowModes: GridRowModesModel;
  setRowModes: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  rows: GridRowsProp;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  disableDelete?: boolean;
  disableEdit?: boolean;
}

export const getGridActionColumn = ({
  rowModes,
  setRowModes,
  rows,
  setRows,
  disableDelete,
  disableEdit,
}: GetActionsCell): GridActionsColDef => {
  const handleEditClick = (id: GridRowId) => () => {
    setRowModes((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  return {
    field: 'actions',
    type: 'actions',
    headerName: 'Hành động',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModes[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) return getGridActionsInEditMode({ id, rows, setRowModes, setRows });

      if (disableEdit) {
        return [<TableDeleteActionButton onClick={handleDeleteClick(id)} />];
      }

      if (disableDelete) {
        return [<TableEditActionButton onClick={handleEditClick(id)} />];
      }

      return [
        <TableEditActionButton onClick={handleEditClick(id)} />,
        <TableDeleteActionButton onClick={handleDeleteClick(id)} />,
      ];
    },
  };
};

export interface GetGridActionsInEditMode {
  id: GridRowId;
  setRowModes: GetActionsCell['setRowModes'];
  rows: GetActionsCell['rows'];
  setRows: GetActionsCell['setRows'];
}

export const getGridActionsInEditMode = ({
  id,
  rows,
  setRowModes,
  setRows,
}: GetGridActionsInEditMode) => {
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModes((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModes((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows((prev) => prev.filter((row) => row.id !== id));
    }
  };

  return [
    <TableSaveActionButton onClick={handleSaveClick(id)} />,
    <TableCancelActionButton onClick={handleCancelClick(id)} />,
  ];
};
