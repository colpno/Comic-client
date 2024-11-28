import { ContainerProps } from '@mui/material';
import React from 'react';

import { cn } from '~/utils/cssUtils.ts';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** @default div */
  component?: ContainerProps['component'];
}

function Island({ component: Component = 'div', className, ...props }: Props) {
  return <Component {...props} className={cn('shadow-lg rounded-md', className)} />;
}

export default Island;
