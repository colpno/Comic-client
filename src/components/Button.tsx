import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/material/Button/Button';
import classNames from 'classnames/bind';
import { AnchorHTMLAttributes, memo } from 'react';
import { Link, LinkProps, To } from 'react-router-dom';

import styles from '~/assets/styles/Button.module.scss';

const cx = classNames.bind(styles);

type AssignProps<T, P> = P & Omit<T, keyof P>;
type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type BaseProps = {
  loading?: boolean;
  disableGutter?: boolean;
  disableTextTransform?: boolean;
};

type ButtonAsButtonProps = AssignProps<MUIButtonProps, BaseProps> & {
  to?: never;
  href?: never;
};

type ButtonAsLinkProps = AssignProps<LinkProps, BaseProps> &
  AssignProps<LinkProps, MUIButtonProps> & {
    to: To;
    href?: never;
  };

type ButtonAsExternalLinkProps = AssignProps<ExternalLinkProps, BaseProps> &
  AssignProps<ExternalLinkProps, MUIButtonProps> & {
    to?: never;
    href: ExternalLinkProps['href'];
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsExternalLinkProps;

const Button = memo(
  ({
    children,
    className,
    loading,
    disableGutter,
    disableTextTransform,
    ...props
  }: ButtonProps) => {
    const classes = cx(
      'btn',
      {
        loading,
        ['disable-gutter']: disableGutter,
        ['disable-text-transform']: disableTextTransform,
      },
      className
    );
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
      <MUIButton {...defaultProps} {...props} className={classes}>
        {loading ? <LoadingSpinner /> : null}
        {children}
      </MUIButton>
    );
  }
);

function LoadingSpinner() {
  return (
    <span className="w-[clamp(6px,15vw,10px)] aspect-square border border-solid border-gray-600 border-b-transparent rounded-full inline-block animate-spin" />
  );
}

export default Button;
