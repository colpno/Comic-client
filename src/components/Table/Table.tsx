import { DataGrid, GridActionsColDef, GridColDef, GridRowModesModel } from '@mui/x-data-grid';
import { memo, useMemo, useState } from 'react';

import { TableProps } from '~/components/Table/tableType.ts';
import {
  getInitialState,
  getSlotProps,
  getSlots,
  handleRowEditStop,
  processRowUpdate,
} from '~/components/Table/utils/tableUtils.tsx';
import { TableProvider } from './TableContext.ts';
import { getCRUDActionsColDef } from './utils/tableColumnUtils.tsx';

function Table(componentProps: TableProps) {
  const {
    rows: rowsProp = [],
    columns,
    addable,
    removable,
    editable,
    onAdd,
    onRemove,
    onEdit,
    rowSelection = false,
    height,
    ...props
  } = componentProps;
  const [rows, setRows] = useState(rowsProp);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const initialTableState = getInitialState(props.initialState);
  const tableColsDef: GridColDef[] = [...columns];
  const slots = getSlots();
  const slotProps = getSlotProps({ setRows, setRowModesModel });
  const checkboxSelection = typeof removable === 'object' && removable?.multiple;
  const actionsColIndex = useMemo(() => columns.findIndex((c) => c.field === 'actions'), [columns]);
  const actionsColDef = columns[actionsColIndex] as GridActionsColDef;
  const actionsColProps: Parameters<typeof getCRUDActionsColDef>[0] = {
    rowModes: rowModesModel,
    setRowModes: setRowModesModel,
    rows,
    setRows,
    editable,
    removable,
    actionsColumn: actionsColDef,
    onRemove,
  };
  const processRowUpdateParams: Parameters<typeof processRowUpdate>[0] = {
    setRows,
    onAdd,
    onEdit,
  };

  // Add actions column if addable, removable, or editable
  if (addable || removable || editable) {
    useMemo(() => {
      const actionsCol = getCRUDActionsColDef(actionsColProps);
      tableColsDef.splice(actionsColIndex, 1);
      tableColsDef.push(actionsCol);
    }, [addable, removable, editable, tableColsDef, actionsColProps, actionsColIndex]);
  }

  return (
    <TableProvider value={componentProps}>
      <div className="h-[600px] sm:h-[500px] md:h-[400px]" style={{ height }}>
        <DataGrid
          pageSizeOptions={[1, 5, 10, 25, 50, 100]}
          {...props}
          editMode="row"
          rows={rows}
          columns={tableColsDef}
          rowModesModel={rowModesModel}
          initialState={initialTableState}
          slots={slots}
          slotProps={slotProps}
          onRowModesModelChange={setRowModesModel}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate(processRowUpdateParams)}
          sortModel={props.sort}
          rowSelection={rowSelection || checkboxSelection}
          checkboxSelection={checkboxSelection}
        />
      </div>
    </TableProvider>
  );
}

export default memo(Table);
export { default as TableActionButton } from './components/TableActionButton.tsx';
export * from './tableType.ts';
export { generateTableActionsColDef } from './utils/tableColumnUtils.tsx';
