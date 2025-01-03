import AccountButton from './HeaderAccountButton.tsx';
import BookshelfButton from './HeaderBookshelfButton.tsx';
import SearchButton from './HeaderSearchButton';
import ThemeButton from './HeaderThemeButton.tsx';

function HeaderActions() {
  return (
    <div className="flex">
      <SearchButton />
      <ThemeButton />
      <BookshelfButton />
      <AccountButton />
    </div>
  );
}

export default HeaderActions;
