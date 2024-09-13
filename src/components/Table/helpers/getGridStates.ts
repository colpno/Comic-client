import {
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
  GridSlotsComponentsProps,
} from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';

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
