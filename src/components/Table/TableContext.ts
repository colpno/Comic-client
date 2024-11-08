import { DataGridProps } from '@mui/x-data-grid';
import { createContext, useContext } from 'react';

import { TableProps } from '~/components/Table/tableType';

export type TableContextType = Pick<DataGridProps, 'checkboxSelection'> &
  Pick<TableProps, 'disableAdd' | 'disableDelete' | 'disableEdit'>;

export const TableContext = createContext<TableContextType>({});

export const TableProvider = TableContext.Provider;

export const useTableContext = () => useContext(TableContext);
