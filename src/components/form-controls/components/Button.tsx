import { Button as MUIButton } from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { ButtonAsUnstyledProps, ButtonProps } from '~/types/formControls.ts';

function Button({
  children,
  className,
  loading,
  disableGutter,
  disableTextTransform,
  unstyled,
  ...props
}: ButtonProps) {
  if (unstyled) {
    return (
      <button {...props} type={props.type ?? 'button'} className={className}>
        {children}
      </button>
    );
  }

  props = props as Exclude<ButtonProps, ButtonAsUnstyledProps>;
  const defaultProps: ButtonProps = {
    type: 'button',
    variant: 'contained',
    disabled: loading,
  };

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
    <MUIButton
      {...defaultProps}
      {...props}
      className={twMerge(
        '[&_+_&]:ml-2',
        loading && 'flex gap-2 items-center',
        disableGutter && '!ml-0',
        disableTextTransform && '!text-transform-none',
        className
      )}
    >
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
