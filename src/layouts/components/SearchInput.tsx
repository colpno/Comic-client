import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import TextInput, { TextInputProps } from '~/components/form-controls/base-controls/TextInput.tsx';
import { Button } from '~/components/index.ts';
import { getSearchRoute } from '~/constants/routeConstants.ts';

interface Props extends Omit<TextInputProps, 'name' | 'value' | 'onSubmit'> {
  name?: string;
  value?: string;
  /** Replace the url when submitting or pressing Enter. */
  replaceUrl?: boolean;
  onSubmit?: (value: string) => void;
}

function SearchInput({ value = '', replaceUrl, onSubmit, ...props }: Props) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>(value);

  const handleChange = (value: string) => {
    setSearchText(value);
  };

  const handleSubmit = () => {
    onSubmit ? onSubmit(searchText) : navigate(getSearchRoute(searchText), { replace: replaceUrl });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <TextInput
      name="search"
      size="small"
      fullWidth
      clearable
      slotProps={{
        input: {
          className: '!rounded-3xl',
          startAdornment: (
            <Button as="iconButton" className="!mr-1" size="small" onClick={handleSubmit}>
              <FiSearch size={22} />
            </Button>
          ),
        },
      }}
      value={searchText}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

export default SearchInput;
