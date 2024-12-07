import { Typography as MUITypography, TypographyProps as MUITypographyProps } from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '~/utils/cssUtils.ts';

type TypoAsLinkProps = MUITypographyProps & {
  href: string;
  externalLink?: false;
};

type TypoAsExternalLinkProps = MUITypographyProps & {
  href: string;
  externalLink: true;
};

type Props = MUITypographyProps | TypoAsLinkProps | TypoAsExternalLinkProps;

function Typography({ className, ...props }: Props) {
  const classes =
    !props.variant || props.variant === 'body1'
      ? cn('!text-sm md:!text-base', className)
      : className;

  if ('href' in props) {
    const { href, externalLink, ...componentProps } = props;

    if (externalLink) {
      return (
        <a href={href}>
          <MUITypography {...componentProps} className={classes} />
        </a>
      );
    }

    return (
      <Link to={href}>
        <MUITypography {...componentProps} className={classes} />
      </Link>
    );
  }

  return <MUITypography {...props} className={classes} />;
}

export default memo(Typography);
