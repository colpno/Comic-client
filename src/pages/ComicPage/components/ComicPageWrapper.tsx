import { Container, ContainerProps } from '@mui/material';

import { Island } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import { cn } from '~/utils/cssUtils.ts';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  containerProps?: ContainerProps;
}

function ComicPageWrapper({ children, containerProps, className, ...islandProps }: Props) {
  return (
    <Container {...containerProps} maxWidth={MUI_CONTAINER_MAX_WIDTH}>
      <Island {...islandProps} className={cn('p-4 bg-main', className)}>
        {children}
      </Island>
    </Container>
  );
}

export default ComicPageWrapper;
