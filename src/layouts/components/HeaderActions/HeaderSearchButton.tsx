import { useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';

import { Button } from '~/components/index.ts';
import SearchPanel from '../SearchPanel.tsx';

function HeaderSearchButton() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Button as="iconButton" color="inherit" title="Search" onClick={() => setShowForm(true)}>
        <MdOutlineSearch />
      </Button>
      <SearchPanel open={showForm} onClose={() => setShowForm(false)} />
    </>
  );
}

export default HeaderSearchButton;
