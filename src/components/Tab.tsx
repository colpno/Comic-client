import { Tab as MUITab, TabProps as MUITabProps } from '@mui/material';
import { ElementType, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { Omit } from '~/types/commonTypes';

interface BaseProps extends Omit<MUITabProps, 'label'> {
  label: string;
}

export type TabAsTabProps = Omit<BaseProps, 'value'>;

export interface TabAsLinkProps extends Omit<BaseProps, 'value' | 'component'> {
  /** Route. @example '/users/add' */
  value: string;
  /**
   * @example
   * import { Link } from 'react-router-dom'; // for internal link
   * 'a' // for external link
   */
  component?: 'a' | ElementType<LinkProps>;
}

export type TabProps = TabAsTabProps | TabAsLinkProps;

function Tab({ component, ...props }: TabProps) {
  const value = 'value' in props ? props.value : undefined;
  const componentToRender = value ? Link : (component as ElementType<LinkProps>);

  return (
    <MUITab {...props} label={props.label} value={value} to={value} component={componentToRender} />
  );
}

export default memo(Tab);
