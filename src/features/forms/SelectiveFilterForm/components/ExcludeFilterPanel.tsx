import { useEffect, useState } from 'react';

import TextInput from '~/components/form-controls/base-controls/TextInput.tsx';
import { CheckBoxGroup, CheckboxOption } from '~/components/index.ts';
import { useDebounce } from '~/hooks/useDebounce.ts';

interface Props {
  options: CheckboxOption[];
}

function ExcludeFilterPanel({ options }: Props) {
  const [excludedOptions, setExcludedOptions] = useState(options);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    if (debouncedSearchText === '') {
      setExcludedOptions(options);
      return;
    }

    const newOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(debouncedSearchText.toLowerCase())
    );
    setExcludedOptions(newOptions);
  }, [setExcludedOptions, debouncedSearchText]);

  return (
    <div>
      <TextInput
        value={searchText}
        name="excludedOptionsSearch"
        label="Search"
        variant="standard"
        size="small"
        fullWidth
        onChange={setSearchText}
      />
      <div>
        <CheckBoxGroup name="excludedOptions" options={excludedOptions} />
      </div>
    </div>
  );
}

export default ExcludeFilterPanel;
