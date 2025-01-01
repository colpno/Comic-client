import { createContext, useContext } from 'react';

import { Props } from '~/components/Table/tableTypes';

export type TableContextType = Partial<Props>;

export const TableContext = createContext<TableContextType>({});

export const TableProvider = TableContext.Provider;

export const useTableContext = () => useContext(TableContext);
