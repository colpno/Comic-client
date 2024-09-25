import { PaginationItem as MUIPaginationItem } from '@mui/material';
import MUIPagination, {
  PaginationProps as MUIPaginationProps,
} from '@mui/material/Pagination/Pagination';
import { memo, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

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

  const [searchParams] = useSearchParams();
  const queryPage = searchParams.get('page');
  const page = queryPage && /^\d+$/.test(queryPage) ? parseInt(queryPage) : defaultPage;
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
    } else if (page <= pageCount) {
      onChange?.(page);
    }
  }, [onChange, page, pageCount]);

  if (!pageCount || pageCount <= 1) return null;

  return (
    <MUIPagination
      {...props}
      shape={shape}
      count={pageCount}
      color={color}
      siblingCount={siblingCount ?? 2}
      page={page}
      onChange={(_, newPage) => onChange?.(newPage)}
      renderItem={(item) => {
        const itemPage = item.page?.toString() || PAGINATION_INITIAL_PAGE.toString();
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', itemPage);

        if (+itemPage === page) return <MUIPaginationItem {...item} />;
        return <MUIPaginationItem {...item} component={Link} to={`?${newParams.toString()}`} />;
      }}
    />
  );
}

export default memo(Pagination);
