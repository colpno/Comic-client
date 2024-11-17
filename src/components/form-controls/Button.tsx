import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  IconButton as MUIIconButton,
} from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import {
  ButtonAsButtonProps,
  ButtonAsExternalLinkProps,
  ButtonAsIconButtonProps,
  ButtonAsLinkProps,
  ButtonProps,
} from '~/types/formControlTypes';
import { cn } from '~/utils/cssUtils.ts';

function Button({
  children,
  className,
  loading,
  disableGutter,
  disableTextTransform,
  disabled,
  as,
  ...props
}: ButtonProps) {
  switch (as) {
    case 'unstyled':
      return (
        <button {...props} type={props.type ?? 'button'} className={className}>
          {children}
        </button>
      );
    case 'iconButton': {
      const { href, ...componentProps } = props as ButtonAsIconButtonProps<'a'>;
      return (
        <MUIIconButton
          type="button"
          LinkComponent={href ? Link : 'a'}
          {...componentProps}
          disabled={disabled || loading}
          href={href as string}
          className={className}
        >
          {children}
        </MUIIconButton>
      );
    }
    case 'link': {
      const componentProps = props as ButtonAsLinkProps;
      componentProps.LinkComponent = Link;
      break;
    }
    case 'externalLink': {
      const componentProps = props as ButtonAsExternalLinkProps;
      componentProps.LinkComponent = 'a';
      break;
    }
    default:
      break;
  }

  if ((props as ButtonAsButtonProps).variant === 'text') {
    props.color = 'inherit';
  }

  return (
    <MUIButton
      type="button"
      variant="contained"
      {...(props as MUIButtonProps)}
      disabled={disabled || loading}
      className={cn(
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
