import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  IconButton as MUIIconButton,
} from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '~/utils/cssUtils.ts';
import { AsButtonProps, AsIconButtonProps, Props } from './types/buttonTypes.ts';

function Button({
  children,
  className,
  loading,
  disableGutter,
  disableTextTransform,
  disabled,
  as,
  href,
  externalLink,
  ...props
}: Props) {
  const LinkComponent = externalLink ? 'a' : Link;
  const hyperlinks = LinkComponent === 'a' ? { href } : { to: href };

  switch (as) {
    case 'unstyled': {
      if (href) {
        return (
          <button {...props} type={props.type ?? 'button'} className={className}>
            <LinkComponent to={href} {...{ [externalLink ? 'href' : 'to']: href }}>
              {children}
            </LinkComponent>
          </button>
        );
      }
      return (
        <button {...props} type={props.type ?? 'button'} className={className}>
          {children}
        </button>
      );
    }
    case 'iconButton': {
      const componentProps = props as AsIconButtonProps;
      return (
        <MUIIconButton
          type="button"
          {...componentProps}
          LinkComponent={LinkComponent}
          {...hyperlinks}
          disabled={disabled || loading}
          className={className}
        >
          {children}
        </MUIIconButton>
      );
    }
    default:
      break;
  }

  if ((props as AsButtonProps).variant === 'text') {
    props.color = 'inherit';
  }

  return (
    <MUIButton
      type="button"
      variant="contained"
      {...(props as MUIButtonProps)}
      LinkComponent={LinkComponent}
      {...hyperlinks}
      disabled={disabled || loading}
      className={cn(
        loading && 'flex gap-2 items-center',
        disableGutter && '!ml-0',
        disableTextTransform && '!normal-case',
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
export type {
  Props as ButtonProps,
  AsButtonProps as ButtonAsButtonProps,
  AsIconButtonProps as ButtonAsIconButtonProps,
  AsUnstyledProps as ButtonAsUnstyledProps,
} from './types/buttonTypes.ts';
