import { createContext, useContext } from 'react';

import { TableProps } from '~/types/index.ts';

export type TableContextType = Partial<TableProps>;

export const TableContext = createContext<TableContextType>({});

export const TableProvider = TableContext.Provider;

export const useTableContext = () => useContext(TableContext);
