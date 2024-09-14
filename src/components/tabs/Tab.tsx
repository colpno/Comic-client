import { Tab as MUITab, TabProps as MUITabProps } from '@mui/material';
import { memo } from 'react';
import { Link, To } from 'react-router-dom';

import { Omit } from '~/types/common.ts';

type BaseProps = MUITabProps;

export interface TabAsTabProps extends BaseProps {
  to?: never;
}

export interface TabAsLinkProps extends Omit<BaseProps, 'value'> {
  /** Internal link. */
  to: To;
  /** Route. @example '/users/add' */
  value: string;
}

export type TabProps = TabAsTabProps | TabAsLinkProps;

function Tab(props: TabProps) {
  if (props.to) {
    props.component = Link;
  }

  return <MUITab {...props} />;
}

export default memo(Tab);
