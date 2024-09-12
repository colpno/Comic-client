import IconButton from '@mui/material/IconButton/IconButton';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import { IoClose, IoEye, IoEyeOff } from 'react-icons/io5';

interface AdornmentProps {
  onClick: () => void;
}

export const EraseAdornment = ({ onClick }: AdornmentProps) => {
  return (
    <InputAdornment position="end">
      <IconButton aria-label="erase field's value" onClick={onClick} edge="end">
        <IoClose fontSize="small" color="disabled" />
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
        {showPassword ? <IoEyeOff fontSize="small" /> : <IoEye color="disabled" fontSize="small" />}
      </IconButton>
    </InputAdornment>
  );
};
