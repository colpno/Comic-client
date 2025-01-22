import {
  GridActionsColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
} from '@mui/x-data-grid';

import { TableProps } from '~/types/index.ts';
import TableApproveActionButton from '../components/TableApproveActionButton.tsx';
import TableCancelActionButton from '../components/TableCancelActionButton.tsx';
import TableDeleteActionButton from '../components/TableDeleteActionButton.tsx';
import TableEditActionButton from '../components/TableEditActionButton.tsx';
import TableSaveActionButton from '../components/TableSaveActionButton.tsx';

/* 
  Columns definition generators
*/

// Actions column definition

interface GetActionHeaderCell extends Omit<GridActionsColDef, 'field' | 'type' | 'getActions'> {
  render: (params: GridRowParams) => JSX.Element[];
}

export const generateTableActionsColDef = ({
  render,
  headerName = 'Actions',
  cellClassName = 'actions',
  align = 'center',
  headerAlign = 'center',
  ...props
}: GetActionHeaderCell): GridActionsColDef => ({
  headerName,
  cellClassName,
  align,
  headerAlign,
  ...props,
  field: 'actions',
  type: 'actions',
  getActions: render,
});

/* 
  CRUD actions column definition generator
*/

interface GetCRUDActionsColDef {
  rowModes: GridRowModesModel;
  setRowModes: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  rows: GridRowsProp;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  removable?: TableProps['removable'];
  editable?: TableProps['editable'];
  onRemove?: GetRemoveModeActions['onRemove'];
  actionsColumn?: GridActionsColDef;
}

export const getCRUDActionsColDef = ({
  rowModes,
  setRowModes,
  rows,
  setRows,
  actionsColumn,
  ...props
}: GetCRUDActionsColDef): GridActionsColDef => {
  const handleEditClick = (id: GridRowId) => () => {
    setRowModes((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    // @ts-expect-error - Custom mode
    setRowModes((prev) => ({ ...prev, [id]: { mode: 'remove' } }));
  };

  return generateTableActionsColDef({
    render: ({ id, ...params }) => {
      const isEditMode = rowModes[id]?.mode === GridRowModes.Edit;
      // @ts-expect-error - Custom mode
      const isRemoveMode = rowModes[id]?.mode === 'remove';
      const cells: JSX.Element[] = [];

      if (isRemoveMode) {
        return getRemoveModeActions({
          id,
          setRowModes,
          setRows,
          onRemove: props.onRemove ?? (() => false),
        });
      }

      if (isEditMode) {
        return getEditModeActions({
          id,
          rows,
          setRowModes,
          setRows,
        });
      }

      if (actionsColumn) {
        cells.push(...actionsColumn.getActions({ id, ...params }));
      }

      if (props.editable) {
        cells.push(<TableEditActionButton onClick={handleEditClick(id)} />);
      }

      const isRemovable =
        props.removable === true || (typeof props.removable === 'object' && props.removable.single);
      if (isRemovable) {
        cells.push(<TableDeleteActionButton onClick={handleDeleteClick(id)} />);
      }

      return cells;
    },
  });
};

// Edit mode actions

interface GetEditModeActions {
  id: GridRowId;
  setRowModes: GetCRUDActionsColDef['setRowModes'];
  rows: GetCRUDActionsColDef['rows'];
  setRows: GetCRUDActionsColDef['setRows'];
}

const getEditModeActions = ({ id, rows, setRowModes, ...props }: GetEditModeActions) => {
  const handleSaveClick = () => () => {
    setRowModes((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
  };

  const handleCancelClick = () => () => {
    setRowModes((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      props.setRows((prev) => prev.filter((row) => row.id !== id));
    }
  };

  return [
    <TableSaveActionButton onClick={handleSaveClick()} />,
    <TableCancelActionButton onClick={handleCancelClick()} />,
  ];
};

// Remove mode actions

interface GetRemoveModeActions extends Pick<GetEditModeActions, 'id' | 'setRowModes' | 'setRows'> {
  onRemove: Exclude<TableProps['onRemove'], undefined>;
}

const getRemoveModeActions = ({ id, ...params }: GetRemoveModeActions) => {
  const cancelRemoveMode = () => {
    params.setRowModes((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  };

  const handleApproveClick = () => async () => {
    const success = await params.onRemove(id as string);
    if (success) {
      params.setRows((prev) => prev.filter((row) => row.id !== id));
      cancelRemoveMode();
    }
  };

  return [
    <TableApproveActionButton label="Remove" onClick={handleApproveClick()} />,
    <TableCancelActionButton onClick={() => cancelRemoveMode()} />,
  ];
};
