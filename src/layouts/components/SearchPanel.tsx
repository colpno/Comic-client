import { Container } from '@mui/material';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

import TextInput from '~/components/form-controls/base-controls/TextInput.tsx';
import { Button } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import HeaderLogo from './HeaderLogo.tsx';

interface SearchPanelProps {
  open: boolean;
  onClose: () => void;
}

function SearchPanel({ open, onClose }: SearchPanelProps) {
  if (!open) return null;

  return (
    <div className="absolute top-0 left-0 right-0 z-header bg-main">
      <Container
        maxWidth={MUI_CONTAINER_MAX_WIDTH}
        className="flex items-center justify-between h-header md:h-header-md"
      >
        <HeaderLogo />
        <div className="flex-[0_1_26rem] px-4 sm:px-8">
          <SearchInput onClose={onClose} />
        </div>
        <Button as="iconButton" title="Close search panel" onClick={onClose}>
          <MdClose />
        </Button>
      </Container>
    </div>
  );
}

export default SearchPanel;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SearchInput({ onClose }: Pick<SearchPanelProps, 'onClose'>) {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchChange = (value: string) => {
    console.log(value);
    setSearchText(value);
    // onClose();
  };

  return (
    <TextInput
      name="searchText"
      label="Search"
      size="small"
      fullWidth
      slotProps={{ input: { className: '!rounded-3xl' } }}
      value={searchText}
      onChange={handleSearchChange}
    />
  );
}
