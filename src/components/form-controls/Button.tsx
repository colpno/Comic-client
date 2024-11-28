import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
  IconButton as MUIIconButton,
} from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import {
  ButtonAsButtonProps,
  ButtonAsIconButtonProps,
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
  href,
  externalLink,
  ...props
}: ButtonProps) {
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
      const componentProps = props as ButtonAsIconButtonProps;
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

  if ((props as ButtonAsButtonProps).variant === 'text') {
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
