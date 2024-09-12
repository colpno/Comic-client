import MUIButton from '@mui/material/Button/Button';
import classNames from 'classnames/bind';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import styles from '~/styles/Button.module.scss';
import { ButtonProps } from '~/types/formControls.ts';

const cx = classNames.bind(styles);

function Button({
  children,
  className,
  loading,
  disableGutter,
  disableTextTransform,
  unstyled,
  ...props
}: ButtonProps) {
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
