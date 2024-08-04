import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CorrectionHistory from '@/components/payroll/CorrectionHistory';
import { PATH } from '@/constants/path';
import RootLayout from '@/layouts/Root';
import HomePage from '@/pages/Home';
import NotFoundPage from '@/pages/NotFound';
import PayrollDetail from '@/pages/PayrollDetail';
import ProfilePage from '@/pages/Profile';
import SalaryPage from '@/pages/Salary';
import SchedulePage from '@/pages/Schedule';
import SignIn from '@/pages/SignIn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: PATH.SCHEDULE, element: <SchedulePage /> },
      {
        path: PATH.SALARY,
        children: [
          { path: '', element: <SalaryPage /> },
          { path: PATH.SALARY_DETAIL, element: <PayrollDetail /> },
          { path: PATH.SALARY_CORRECTION_HISTORY, element: <CorrectionHistory /> },
        ],
      },
      { path: PATH.PROFILE, element: <ProfilePage /> },
    ],
  },
  {
    path: PATH.SIGNIN,
    element: <SignIn />,
  },
]);

const App = () => <RouterProvider router={router} />;
export default App;
