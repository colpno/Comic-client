import { createContext, useContext } from 'react';

import { TableProps } from '~/components/Table/tableType';

export type TableContextType = Partial<TableProps>;

export const TableContext = createContext<TableContextType>({});

export const TableProvider = TableContext.Provider;

export const useTableContext = () => useContext(TableContext);
