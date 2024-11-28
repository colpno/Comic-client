import { Outlet } from 'react-router-dom';

import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';

function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 mb-16 mt-header md:mt-header-md">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
