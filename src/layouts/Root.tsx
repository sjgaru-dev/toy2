import { Outlet } from 'react-router-dom';

import Navbar from '@/components/layout/Navbar';

const RootLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </>
);

export default RootLayout;
