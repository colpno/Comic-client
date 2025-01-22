import { Container } from '@mui/material';

import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { cn } from '~/utils/cssUtils.ts';

function MenuLayoutHeaderContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn('border-b dark:border-gray-800  bg-main', className)}>
      <Container maxWidth={MUI_CONTAINER_MAX_WIDTH} component="nav">
        {children}
      </Container>
    </div>
  );
}

export default MenuLayoutHeaderContainer;
