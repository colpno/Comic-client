import { v4 } from 'uuid';

import { Dialog } from '~/components/index.ts';

interface GuidePopupProps {
  open: boolean;
  onClose: () => void;
}

interface GuidePopupRow {
  action: string;
  description: string;
}

function ReadingLayoutGuidePopup({ open, onClose }: GuidePopupProps) {
  const tableRows: GuidePopupRow[] = [
    {
      action: "Click/Touch on chapter's images.",
      description: 'To toggle header.',
    },
  ];

  return (
    <Dialog open={open} title="Reading Guide" onClose={onClose}>
      <table className="[&_th]:border [&_th]:border-black [&_td]:border [&_td]:border-black [&_td]:px-2">
        <tr className="*:text-center">
          <th>Action</th>
          <th>Description</th>
        </tr>
        {tableRows.map((row) => (
          <tr key={v4()}>
            <td>{row.action}</td>
            <td>{row.description}</td>
          </tr>
        ))}
      </table>
    </Dialog>
  );
}

export default ReadingLayoutGuidePopup;
