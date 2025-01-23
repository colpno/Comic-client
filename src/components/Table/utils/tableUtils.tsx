import {
  GridEventListener,
  GridRowEditStopReasons,
  GridRowModel,
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
  GridSlotsComponentsProps,
} from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';

import { TableProps } from '~/types/index.ts';
import TableNoRowsOverlay from '../components/TableNoRowsOverlay.tsx';
import TableNoSearchResultsOverlay from '../components/TableNoSearchResultsOverlay.tsx';
import TablePagination from '../components/TablePagination.tsx';
import TableToolbar from '../components/TableToolbar.tsx';

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

interface GetSlotProps extends GridSlotsComponentsProps, Pick<TableProps, 'disableExport'> {
  setRows: (rows: GridRowsProp) => void;
  setRowModesModel: (rowModesModel: GridRowModesModel) => void;
}

export const getSlotProps = ({
  setRows,
  setRowModesModel,
  disableExport = false,
}: GetSlotProps): GridSlotsComponentsProps => ({
  toolbar: {
    setRows,
    setRowModesModel,
    printOptions: { hideToolbar: true, disableToolbarButton: disableExport },
    csvOptions: { disableToolbarButton: disableExport },
  },
  loadingOverlay: {
    variant: 'skeleton',
    noRowsVariant: 'skeleton',
  },
});

interface ProcessRowUpdate {
  setRows: React.Dispatch<React.SetStateAction<Exclude<TableProps['rows'], undefined>>>;
  onAdd?: TableProps['onAdd'];
  onEdit?: TableProps['onEdit'];
}

export const processRowUpdate =
  ({ setRows, onAdd, onEdit }: ProcessRowUpdate) =>
  (newRow: GridRowModel) => {
    // Call onAdd if the row is new
    if ('isNew' in newRow && newRow.isNew) {
      setRows((prev) => prev.map((row) => (row.id === newRow.id ? newRow : row)));
      onAdd?.(newRow);
      return newRow;
    }

    // Call onEdit if the row is not new
    const updatedRow = { ...newRow, isNew: false };
    setRows((prev) => prev.map((row) => (row.id === newRow.id ? updatedRow : row)));
    onEdit?.(updatedRow);
    return updatedRow;
  };

export const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
  if (params.reason === GridRowEditStopReasons.rowFocusOut) {
    event.defaultMuiPrevented = true;
  }
};
