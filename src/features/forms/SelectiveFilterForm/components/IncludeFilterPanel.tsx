import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import TextInput from '~/components/form-controls/base-controls/TextInput.tsx';
import { CheckboxGroup } from '~/components/index.ts';
import { useDebounce } from '~/hooks/index.ts';
import { CheckboxOption } from '~/types/index.ts';

interface Props {
  options: CheckboxOption[];
}

function IncludeFilterPanel({ options }: Props) {
  const [includedOptions, setIncludedOptions] = useState(options);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setValue } = useFormContext();
  const includes = searchParams.get('includes');

  const handleCheckboxGroupChange = (values: string[]) => {
    if (values.length > 0) {
      setSearchParams({
        includes: values.join('+'),
      });
    } else {
      setSearchParams((prev) => {
        const values = { ...prev };
        if ('includes' in values) delete values.includes;
        return values;
      });
    }
  };

  useEffect(() => {
    if (includes) {
      setValue('includedOptions', includes.split('+'));
    }
  }, [includes]);

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
        <CheckboxGroup
          name="includedOptions"
          options={includedOptions}
          onChange={handleCheckboxGroupChange}
        />
      </div>
    </div>
  );
}

export default IncludeFilterPanel;
