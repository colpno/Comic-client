import { Outlet } from 'react-router-dom';

import { cn } from '~/utils/cssUtils.ts';
import Footer from './components/Footer.tsx';
import Header from './components/Header.tsx';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

function BasicLayout({ children, className, ...props }: Props) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main {...props} className={cn('flex-1 pt-header md:pt-header-md', className)}>
        {children ?? <Outlet />}
      </main>
      <Footer />
    </div>
  );
}

export default BasicLayout;
