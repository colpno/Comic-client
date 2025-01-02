import { MdClose } from 'react-icons/md';

import { Button, ButtonAsIconButtonProps } from '~/components/index.ts';

function DynamicFieldDeleteButton(props: Partial<ButtonAsIconButtonProps>) {
  return (
    <Button
      as="iconButton"
      size="small"
      color="inherit"
      sx={{
        '&:hover': {
          color: 'var(--red-color)',
        },
      }}
      style={{
        width: 'unset',
        height: 'unset',
      }}
      {...props}
    >
      <MdClose />
    </Button>
  );
}

export default DynamicFieldDeleteButton;
