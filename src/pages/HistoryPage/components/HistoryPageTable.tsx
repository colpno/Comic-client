import { Table } from '~/components/index.ts';
import { TableData, TableProps } from '~/types/index.ts';
import { getTableDef } from '../historyPageTableDef.tsx';

interface Props extends Omit<TableProps, 'columns' | 'rows' | 'removable' | 'onRemove'> {
  data: TableData;
  onRemove: Exclude<React.ComponentProps<typeof Table>['onRemove'], undefined>;
}

function HistoryPageTable({ data, onRemove, ...props }: Props) {
  return (
    <Table
      {...props}
      columns={getTableDef()}
      rows={data}
      removable={{ single: true, multiple: true }}
      onRemove={onRemove}
    />
  );
}

export default HistoryPageTable;
