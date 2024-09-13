import { Button as MUIButton } from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { ButtonProps } from '~/types/formControls.ts';

function Button({
  children,
  className,
  loading,
  disableGutter,
  disableTextTransform,
  unstyled,
  ...props
}: ButtonProps) {
  let classes = `${className} [&_+_&]:ml-2`;
  if (loading) classes += ' flex gap-2 items-center';
  if (disableGutter) classes += ' !ml-0';
  if (disableTextTransform) classes += ' !text-transform-none';

  const defaultProps: ButtonProps = {
    type: 'button',
    variant: 'contained',
    disabled: loading,
  };

  if (unstyled) {
    return (
      <button {...props} className={className}>
        {children}
      </button>
    );
  }

  if (props.variant === 'text') {
    defaultProps.color = 'inherit';
  }

  if (props.to) {
    defaultProps.LinkComponent = Link;
  }

  if (props.href) {
    defaultProps.LinkComponent = 'a';
  }

  return (
    <MUIButton {...defaultProps} {...props} className={classes}>
      <div className="text-3xl bg:red *:border-l-2" />
      {loading ? <LoadingSpinner /> : null}
      {children}
    </MUIButton>
  );
}

function LoadingSpinner() {
  return (
    <span className="w-[clamp(6px,15vw,10px)] aspect-square border border-solid border-gray-600 border-b-transparent rounded-full inline-block animate-spin" />
  );
}

export default memo(Button);
