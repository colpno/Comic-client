import MUIPagination, {
  PaginationProps as MUIPaginationProps,
} from '@mui/material/Pagination/Pagination';
import { memo } from 'react';

import { PAGINATION_INITIAL_PAGE } from '~/constants/common.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';

export interface PaginationProps extends Omit<MUIPaginationProps, 'onChange' | 'count'> {
  pageCount: number;
  onChange?: (newPage: number) => void;
}

function Pagination({
  shape = 'rounded',
  color = 'primary',
  siblingCount = 2,
  defaultPage = PAGINATION_INITIAL_PAGE,
  pageCount,
  onChange,
  ...props
}: PaginationProps) {
  const isMobile = useDeviceWatcher() === 'mobile';
  if (isMobile) {
    siblingCount = 1;
    props.hidePrevButton = true;
    props.hideNextButton = true;
  }

  if (!pageCount || pageCount <= 0) return null;

  return (
    <MUIPagination
      shape={shape}
      count={pageCount}
      siblingCount={siblingCount}
      color={color}
      {...props}
      defaultPage={defaultPage}
      onChange={(_, newPage) => onChange?.(newPage)}
    />
  );
}

export default memo(Pagination);
