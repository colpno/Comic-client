import { Table, TableData } from '~/components/index.ts';
import { getTableDef } from '../historyPageTableDef.tsx';

interface Props {
  data: TableData;
}

function HistoryPageTable({ data }: Props) {
  const handleRemove = (id: string | string[]) => {
    // TODO: Implement remove a history
    console.log('id:', id);
    return true;
  };

  return (
    <Table
      columns={getTableDef()}
      rows={data}
      removable={{ single: true, multiple: true }}
      onRemove={handleRemove}
    />
  );
}

export default HistoryPageTable;
