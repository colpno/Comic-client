import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

interface ShowPasswordAdornmentProps {
  onClick: () => void;
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
