import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer.tsx';
import Header from './components/MenuLayoutHeader.tsx';

function MenuLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 pt-6 pb-16 sm:pt-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MenuLayout;
