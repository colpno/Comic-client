import { Button, ButtonAsButtonProps } from '~/components/index.ts';

function DynamicFieldMoreButton(props: ButtonAsButtonProps) {
  return (
    <Button
      variant="text"
      color="inherit"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
        },
      }}
      {...props}
    >
      More
    </Button>
  );
}

export default DynamicFieldMoreButton;
