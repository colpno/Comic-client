import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../components/Footer.tsx';
import Header from './components/ReadingLayoutHeader';
import {
  ReadingLayoutContextProvider as ContextProvider,
  ReadingLayoutContextType as ContextType,
} from './ReadingLayoutContext.ts';

function ReadingLayout() {
  const [visibility, setVisibility] = useState(true);

  const toggleVisibility = () => setVisibility((prev) => !prev);

  const contextValues: ContextType = {
    headerVisibility: visibility,
    setHeaderVisibility: setVisibility,
    toggleHeaderVisibility: toggleVisibility,
  };

  return (
    <ContextProvider value={contextValues}>
      <div className="flex flex-col min-h-dvh">
        <Header />
        <main className="flex-1 pb-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ContextProvider>
  );
}

export default ReadingLayout;
