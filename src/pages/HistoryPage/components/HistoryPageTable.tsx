import { Table, TableData } from '~/components/index.ts';
import { getTableDef } from '../historyPageTableDef.tsx';

interface Props {
  data: TableData;
  onRemove: Exclude<React.ComponentProps<typeof Table>['onRemove'], undefined>;
}

function HistoryPageTable({ data, onRemove }: Props) {
  return (
    <Table
      columns={getTableDef()}
      rows={data}
      removable={{ single: true, multiple: true }}
      onRemove={onRemove}
    />
  );
}

export default HistoryPageTable;
