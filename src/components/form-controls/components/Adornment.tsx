import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

interface AdornmentProps {
  onClick: () => void;
}

export const EraseAdornment = ({ onClick }: AdornmentProps) => {
  return (
    <InputAdornment position="end">
      <IconButton aria-label="erase field's value" onClick={onClick} edge="end">
        <Close fontSize="small" color="disabled" />
      </IconButton>
    </InputAdornment>
  );
};

interface ShowPasswordAdornmentProps extends AdornmentProps {
  showPassword: boolean;
}

export const ShowPasswordAdornment = ({ onClick, showPassword }: ShowPasswordAdornmentProps) => {
  return (
    <InputAdornment position="end">
      <IconButton aria-label="toggle password visibility" onClick={onClick} edge="end">
        {showPassword ? (
          <VisibilityOff fontSize="small" />
        ) : (
          <Visibility color="disabled" fontSize="small" />
        )}
      </IconButton>
    </InputAdornment>
  );
};
