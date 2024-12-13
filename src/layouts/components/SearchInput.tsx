import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import TextInput from '~/components/form-controls/base-controls/TextInput.tsx';
import { getSearchRoute } from '~/constants/routeConstants.ts';

interface Props extends Omit<React.ComponentProps<typeof TextInput>, 'name' | 'value'> {
  name?: string;
  value?: string;
  /** Replace the url when submitting or pressing Enter. */
  replaceUrl?: boolean;
}

function SearchInput({ value = '', replaceUrl, ...props }: Props) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>(value);

  const handleChange = (value: string) => {
    setSearchText(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(getSearchRoute(searchText), { replace: replaceUrl });
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
          startAdornment: <FiSearch size={22} className="mr-2" />,
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
