import { Outlet } from 'react-router-dom';

import Header from './BookshelfLayout/components/BookshelfLayoutHeader.tsx';
import Footer from './components/Footer.tsx';

function UserBasicLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 bg-sub pt-header md:pt-header-md">
        <Outlet />
      </main>
      <Footer className="py-4 text-white bg-black" />
    </div>
  );
}

export default UserBasicLayout;
