import { useState } from 'react';
import { GoQuestion } from 'react-icons/go';

import { Button } from '~/components/index.ts';
import AccountButton from '~/layouts/components/HeaderActions/HeaderAccountButton.tsx';
import BookshelfButton from '~/layouts/components/HeaderActions/HeaderBookshelfButton.tsx';
import ThemeButton from '~/layouts/components/HeaderActions/HeaderThemeButton.tsx';
import Guide from './ReadingLayoutGuidePopup.tsx';

function HelpButton() {
  const [guidePopup, setGuidePopup] = useState(false);

  const openGuidePopup = () => setGuidePopup(true);
  const closeGuidePopup = () => setGuidePopup(false);

  return (
    <>
      <Button as="iconButton" color="inherit" title="Reading guide" onClick={openGuidePopup}>
        <GoQuestion />
      </Button>
      <Guide open={guidePopup} onClose={closeGuidePopup} />
    </>
  );
}

function ReadingLayoutHeaderActions() {
  return (
    <nav className="flex items-center">
      <HelpButton />
      <BookshelfButton />
      <ThemeButton />
      <AccountButton />
    </nav>
  );
}

export default ReadingLayoutHeaderActions;
