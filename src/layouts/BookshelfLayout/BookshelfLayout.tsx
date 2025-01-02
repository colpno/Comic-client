import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer.tsx';
import Header from './components/BookshelfLayoutHeader.tsx';
import SubHeader from './components/BookshelfLayoutSubHeader.tsx';

function BookshelfLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 pb-12 pt-header md:pt-header-md">
        <SubHeader />
        <Outlet />
      </main>
      <Footer className="py-4 text-white bg-black" />
    </div>
  );
}

export default BookshelfLayout;
