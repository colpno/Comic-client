import MUITypography, { TypographyProps } from '@mui/material/Typography/Typography';
import classNames from 'classnames/bind';
import { AnchorHTMLAttributes, memo } from 'react';
import { Link, LinkProps, To } from 'react-router-dom';

import styles from '~/styles/Typography.module.scss';

const cx = classNames.bind(styles);

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

type TypoAsTypoProps = TypographyProps & {
  to?: never;
  href?: never;
};

type TypoAsLinkProps = LinkProps & {
  to: To;
  href?: never;
};

type TypoAsExternalLinkProps = ExternalLinkProps & {
  to?: never;
  href: ExternalLinkProps['href'];
};

type Props = TypoAsTypoProps | TypoAsLinkProps | TypoAsExternalLinkProps;

function Typography({ className, ...props }: Props) {
  const classes = cx(
    {
      link: props.to,
      ['external-link']: props.href,
    },
    className
  );

  if (props.to) {
    return <Link className={classes} {...props} />;
  }

  if (props.href) {
    return <a className={classes} {...props} />;
  }

  return <MUITypography className={classes} {...props} />;
}

export default memo(Typography);
