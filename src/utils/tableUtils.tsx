import {
  GridActionsColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
  GridSlotsComponentsProps,
} from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';

import TableCancelActionButton from '~/components/Table/components/TableCancelActionButton.tsx';
import TableDeleteActionButton from '~/components/Table/components/TableDeleteActionButton.tsx';
import TableEditActionButton from '~/components/Table/components/TableEditActionButton.tsx';
import TableNoRowsOverlay from '~/components/Table/components/TableNoRowsOverlay.tsx';
import TableNoSearchResultsOverlay from '~/components/Table/components/TableNoSearchResultsOverlay.tsx';
import TablePagination from '~/components/Table/components/TablePagination.tsx';
import TableSaveActionButton from '~/components/Table/components/TableSaveActionButton.tsx';
import TableToolbar from '~/components/Table/components/TableToolbar.tsx';

interface GetActionsCell {
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

interface GetGridActionsInEditMode {
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
export const getInitialState = (
  initialState?: GridInitialStateCommunity
): GridInitialStateCommunity => ({
  ...initialState,
  pagination: {
    ...initialState?.pagination,
    paginationModel: {
      pageSize: 25,
      ...initialState?.pagination?.paginationModel,
    },
  },
});

export const getSlots = (): Partial<GridSlots> => ({
  toolbar: TableToolbar as GridSlots['toolbar'],
  pagination: TablePagination,
  noRowsOverlay: TableNoRowsOverlay,
  noResultsOverlay: TableNoSearchResultsOverlay,
});

interface GetSlotProps extends GridSlotsComponentsProps {
  setRows: (rows: GridRowsProp) => void;
  setRowModesModel: (rowModesModel: GridRowModesModel) => void;
}

export const getSlotProps = ({
  setRows,
  setRowModesModel,
}: GetSlotProps): GridSlotsComponentsProps => ({
  toolbar: {
    setRows,
    setRowModesModel,
    printOptions: { hideToolbar: true },
  },
  loadingOverlay: {
    variant: 'skeleton',
    noRowsVariant: 'skeleton',
  },
});
