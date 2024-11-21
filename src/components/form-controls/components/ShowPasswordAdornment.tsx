import { IconButton, InputAdornment } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface ShowPasswordAdornmentProps {
  onClick: () => void;
  showPassword: boolean;
}

export const ShowPasswordAdornment = ({ onClick, showPassword }: ShowPasswordAdornmentProps) => {
  return (
    <InputAdornment position="end">
      <IconButton aria-label="toggle password visibility" onClick={onClick} edge="end">
        {showPassword ? (
          <MdVisibilityOff fontSize="small" />
        ) : (
          <MdVisibility color="disabled" fontSize="small" />
        )}
      </IconButton>
    </InputAdornment>
  );
};
