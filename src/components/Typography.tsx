import { Typography as MUITypography, TypographyProps as MUITypographyProps } from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { cn } from '~/utils/cssUtils.ts';

type TypoAsLinkProps = MUITypographyProps & {
  href: string;
  externalLink?: false;
};

type TypoAsExternalLinkProps = MUITypographyProps & {
  href: string;
  externalLink: true;
};

type TypoAsCopyableTextProps = Omit<MUITypographyProps, 'children'> & {
  children: string;
  copyable?: boolean;
};

type Props =
  | MUITypographyProps
  | TypoAsLinkProps
  | TypoAsExternalLinkProps
  | TypoAsCopyableTextProps;

function Typography(props: Props) {
  if ('href' in props && props.href) {
    const { externalLink } = props;

    if (externalLink) return <ExternalLinkTypography {...props} />;

    return <InternalLinkTypography {...props} />;
  }

  if ('copyable' in props && props.copyable) {
    return <CopyableTypography {...props} />;
  }

  return <MUITypography {...props} />;
}

export default memo(Typography);

function ExternalLinkTypography({ href, ...props }: TypoAsExternalLinkProps) {
  return (
    <a href={href}>
      <MUITypography {...props} />
    </a>
  );
}

function InternalLinkTypography({ href, ...props }: TypoAsLinkProps) {
  return (
    <Link to={href}>
      <MUITypography {...props} />
    </Link>
  );
}

function CopyableTypography(props: TypoAsCopyableTextProps) {
  const copyText = () => {
    navigator.clipboard
      .writeText(props.children)
      .then(() => toast.success('Copied to clipboard'))
      .catch(() => toast.error('Failed to copy to clipboard'));
  };

  return (
    <MUITypography
      onClick={copyText}
      title="Click to copy"
      {...props}
      className={cn('cursor-pointer text-primary-500', props.className)}
    >
      {props.children}
    </MUITypography>
  );
}
