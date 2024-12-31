import { Typography as MUITypography, TypographyProps as MUITypographyProps } from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';

type TypoAsLinkProps = MUITypographyProps & {
  href: string;
  externalLink?: false;
};

type TypoAsExternalLinkProps = MUITypographyProps & {
  href: string;
  externalLink: true;
};

type Props = MUITypographyProps | TypoAsLinkProps | TypoAsExternalLinkProps;

function Typography(props: Props) {
  if ('href' in props) {
    const { href, externalLink, ...componentProps } = props;

    if (externalLink) {
      return (
        <a href={href}>
          <MUITypography {...componentProps} />
        </a>
      );
    }

    return (
      <Link to={href}>
        <MUITypography {...componentProps} />
      </Link>
    );
  }

  return <MUITypography {...props} />;
}

export default memo(Typography);
