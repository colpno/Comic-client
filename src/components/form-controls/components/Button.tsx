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
  disabled,
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

  if (props.variant === 'text') {
    props.color = 'inherit';
  }

  if (props.to) {
    props.LinkComponent = Link;
  }

  if (props.href) {
    props.LinkComponent = 'a';
  }

  return (
    <MUIButton
      type="button"
      variant="contained"
      {...props}
      disabled={disabled || loading}
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
