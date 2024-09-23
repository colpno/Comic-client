import MUIPagination, {
  PaginationProps as MUIPaginationProps,
} from '@mui/material/Pagination/Pagination';
import { memo } from 'react';

import { PAGINATION_INITIAL_PAGE } from '~/constants/common.ts';
import { useDeviceWatcher } from '~/hooks/useDeviceWatcher.ts';

export interface PaginationProps extends Omit<MUIPaginationProps, 'onChange' | 'count'> {
  /** Total of pages */
  pageCount: number;
  onChange?: (newPage: number) => void;
}

function Pagination({
  shape = 'rounded',
  color = 'primary',
  defaultPage = PAGINATION_INITIAL_PAGE,
  pageCount,
  siblingCount,
  onChange,
  ...props
}: PaginationProps) {
  const isMobile = useDeviceWatcher() === 'mobile';
  if (isMobile) {
    siblingCount = siblingCount ?? 1;
    props.hidePrevButton = props.hidePrevButton ?? true;
    props.hideNextButton = props.hideNextButton ?? true;
  }

  if (!pageCount || pageCount <= 1) return null;

  return (
    <MUIPagination
      {...props}
      shape={shape}
      count={pageCount}
      color={color}
      siblingCount={siblingCount ?? 2}
      defaultPage={defaultPage}
      onChange={(_, newPage) => onChange?.(newPage)}
    />
  );
}

export default memo(Pagination);
