import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer.tsx';
import Header from './components/SearchLayoutHeader';

function SearchLayout() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 pb-16 pt-header md:pt-header-md">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default SearchLayout;
