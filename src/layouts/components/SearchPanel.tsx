import { Container } from '@mui/material';
import { MdClose } from 'react-icons/md';

import { Button } from '~/components/index.ts';
import { MUI_CONTAINER_MAX_WIDTH } from '~/constants/commonConstants.ts';
import HeaderLogo from './HeaderLogo.tsx';
import SearchInput from './SearchInput';

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
        className="flex items-center justify-between h-header md:h-header-md text-main"
      >
        <HeaderLogo />
        <div className="flex-[0_1_26rem] px-4 sm:px-8">
          <SearchInput />
        </div>
        <Button as="iconButton" color="inherit" title="Close search panel" onClick={onClose}>
          <MdClose />
        </Button>
      </Container>
    </div>
  );
}

export default SearchPanel;
