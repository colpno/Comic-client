import { useEffect, useState } from 'react';

import TextInput from '~/components/form-controls/base-controls/TextInput.tsx';
import { CheckBoxGroup, CheckboxOption } from '~/components/index.ts';
import { useDebounce } from '~/hooks/useDebounce.ts';

interface Props {
  options: CheckboxOption[];
}

function IncludeFilterPanel({ options }: Props) {
  const [includedOptions, setIncludedOptions] = useState(options);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    if (debouncedSearchText === '') {
      setIncludedOptions(options);
      return;
    }

    const newOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(debouncedSearchText.toLowerCase())
    );
    setIncludedOptions(newOptions);
  }, [setIncludedOptions, debouncedSearchText]);

  return (
    <div>
      <TextInput
        value={searchText}
        name="includedOptionsSearch"
        label="Search"
        variant="standard"
        size="small"
        fullWidth
        onChange={setSearchText}
      />
      <div>
        <CheckBoxGroup name="includedOptions" options={includedOptions} />
      </div>
    </div>
  );
}

export default IncludeFilterPanel;
