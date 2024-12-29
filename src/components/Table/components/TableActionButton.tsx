import { GridActionsCellItem } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

export interface TableActionButtonProps {
  icon?: JSX.Element;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  externalLink?: boolean;
}

function TableActionButton({
  label,
  icon = <></>,
  href,
  externalLink,
  ...props
}: TableActionButtonProps) {
  const LinkComponent = href ? (externalLink ? 'a' : Link) : undefined;

  return (
    <GridActionsCellItem
      LinkComponent={LinkComponent}
      // @ts-expect-error - `GridActionsCellItem` is not compatible with `Link`, so `to` is not recognized.
      to={href}
      color="inherit"
      title={label}
      {...props}
      icon={icon}
      label={label}
    />
  );
}

export default TableActionButton;
