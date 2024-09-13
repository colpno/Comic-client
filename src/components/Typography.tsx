import { Typography as MUITypography, TypographyProps } from '@mui/material';
import { AnchorHTMLAttributes, memo } from 'react';
import { Link, LinkProps, To } from 'react-router-dom';

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

function Typography(props: Props) {
  if (props.to) {
    return <Link {...props} />;
  }

  if (props.href) {
    return <a {...props} />;
  }

  return <MUITypography {...props} />;
}

export default memo(Typography);
