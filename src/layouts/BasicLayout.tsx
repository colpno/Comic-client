import { Outlet } from 'react-router-dom';

import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';

function BasicLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 pt-header md:pt-header-md">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default BasicLayout;
