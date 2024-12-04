import { Dialog } from '@mui/material';

import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';
import { cn } from '~/utils/cssUtils.ts';
import { Button, Typography } from './index.ts';

interface Props {
  open: boolean;
  title: string;
  children: React.ReactNode;
  overrideUI?: {
    title: React.ReactNode;
    actions: React.ReactNode;
  };
  classes?: {
    root?: string;
    title?: string;
    content?: string;
    actions?: string;
  };
  onAccept?: () => void;
  onReject?: () => void;
  onClose?: () => void;
}

function Popup({ open, onReject, onAccept, onClose, title, children, overrideUI, classes }: Props) {
  const isMobile = useDeviceWatcher() === 'mobile';

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile} className="z-popup">
      <div className={cn('p-3 border-b text-primary', classes?.title)}>
        {overrideUI?.title || <Typography variant="h5">{title}</Typography>}
      </div>
      <div className={cn('px-6 overflow-y-auto shadow-inner py-9 text-main', classes?.content)}>
        {children}
      </div>
      <div className={cn('p-3 text-right border-t', classes?.actions)}>
        {overrideUI?.actions || (
          <>
            {onAccept && <Button onClick={onAccept}>Yes</Button>}
            {onReject && (
              <Button variant="outlined" onClick={onReject}>
                No
              </Button>
            )}
            {onClose && (
              <Button variant="outlined" onClick={onClose}>
                Close
              </Button>
            )}
          </>
        )}
      </div>
    </Dialog>
  );
}

export default Popup;
