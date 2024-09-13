import { TablePaginationProps } from '@mui/material';
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
import {
  gridPageCountSelector,
  GridPagination,
  PaginationPropsOverrides,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

import { Pagination } from '~/components/index.ts';

function CustomPagination({ page, onPageChange, className }: TablePaginationActionsProps) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      shape="circular"
      className={className}
      pageCount={pageCount}
      page={page + 1}
      onChange={(newPage) => onPageChange(null, newPage - 1)}
    />
  );
}

function TablePagination(props: Partial<TablePaginationProps> & PaginationPropsOverrides) {
  return <GridPagination ActionsComponent={CustomPagination} {...props} />;
}

export default TablePagination;
