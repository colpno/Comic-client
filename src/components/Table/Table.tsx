import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowModel,
  GridRowModesModel,
} from '@mui/x-data-grid';
import { memo, useState } from 'react';

import { TableProps } from '~/types/tableTypes.ts';
import {
  getGridActionColumn,
  getInitialState,
  getSlotProps,
  getSlots,
} from '~/utils/tableUtils.tsx';
import { TableContextType, TableProvider } from './TableContext.ts';

function Table({
  rows: rowsProp = [],
  columns: columnsProp,
  disableAdd,
  disableEdit,
  disableDelete,
  sort,
  ...props
}: TableProps) {
  const [rows, setRows] = useState(rowsProp);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const initialState = getInitialState(props.initialState);
  const slots = getSlots();
  const slotProps = getSlotProps({ setRows, setRowModesModel });
  const contextProviderValues: TableContextType = {
    checkboxSelection: props.checkboxSelection,
    disableDelete,
    disableEdit,
    disableAdd,
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns: GridColDef[] = [
    ...columnsProp,
    getGridActionColumn({ rowModes: rowModesModel, setRowModes: setRowModesModel, rows, setRows }),
  ];

  return (
    <TableProvider value={contextProviderValues}>
      <DataGrid
        pageSizeOptions={[1, 5, 10, 25, 50, 100]}
        {...props}
        editMode="row"
        rows={rows}
        columns={columns}
        rowModesModel={rowModesModel}
        initialState={initialState}
        slots={slots}
        slotProps={slotProps}
        onRowModesModelChange={setRowModesModel}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        sortModel={sort}
      />
    </TableProvider>
  );
}

export default memo(Table);
