// Layout.tsx
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Nav/nav';
import Sidebar from '../sidebar/sidebar';

interface LayoutProps {
  children: ReactNode; // ReactNode can represent any valid JSX children
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="w-[100%]">
          <Outlet />
          {children} {/* Render the child routes */}
        </main>
      </div>
    </>
  );
};

export default Layout;
