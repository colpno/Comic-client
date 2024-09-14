import { Typography as MUITypography, TypographyProps as MUITypographyProps } from '@mui/material';
import { AnchorHTMLAttributes, memo } from 'react';
import { Link, LinkProps, To } from 'react-router-dom';

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

function Typography(props: TypographyProps) {
  if (props.to) {
    return <Link {...props} />;
  }

  if (props.href) {
    return <a {...props} />;
  }

  return <MUITypography {...props} />;
}

export default memo(Typography);
