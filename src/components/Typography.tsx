import { Typography as MUITypography, TypographyProps as MUITypographyProps } from '@mui/material';
import { AnchorHTMLAttributes, memo } from 'react';
import { Link, LinkProps, To } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

type TypoAsTypoProps = MUITypographyProps & {
  to?: never;
  href?: never;
};

type TypoAsLinkProps = LinkProps & {
  /** For internal link */
  to: To;
  href?: never;
};

type TypoAsExternalLinkProps = ExternalLinkProps & {
  to?: never;
  /** For external link */
  href: ExternalLinkProps['href'];
};

export type TypographyProps = TypoAsTypoProps | TypoAsLinkProps | TypoAsExternalLinkProps;

function Typography({ className, ...props }: TypographyProps) {
  if (props.to) {
    return <Link {...props} className={twMerge('text-primary', className)} />;
  }

  if (props.href) {
    return <a {...props} className={twMerge('text-primary', className)} />;
  }

  return <MUITypography {...props} className={className} />;
}

export default memo(Typography);
