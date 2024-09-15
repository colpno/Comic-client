import { Tab as MUITab, TabProps as MUITabProps } from '@mui/material';
import { ElementType, memo } from 'react';
import { LinkProps, To } from 'react-router-dom';

import { Omit } from '~/types/common.ts';

interface BaseProps extends Omit<MUITabProps, 'label'> {
  label: string;
}

export interface TabAsTabProps extends BaseProps {
  to?: never;
}

export interface TabAsLinkProps extends Omit<BaseProps, 'value'> {
  /** Internal link. @example '/users/1' */
  to: To;
  /** Route. @example '/users/add' */
  value: string;
  /**
   * @example
   * import { Link } from 'react-router-dom'; // for internal link
   * 'a' // for external link
   */
  component: 'a' | ElementType<LinkProps>;
}

export type TabProps = TabAsTabProps | TabAsLinkProps;

function Tab(props: TabProps) {
  return <MUITab {...props} />;
}

export default memo(Tab);
