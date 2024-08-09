import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom';

import CorrectionHistory from '@/components/payroll/CorrectionHistory';
import { PATH } from '@/constants/path';
import RootLayout from '@/layouts/Root';
import CorrectionDetail from '@/pages/CorrectionDetail';
import CorrectionEdit from '@/pages/CorrectionEdit';
import DailyScheduleDetail from '@/pages/DailyScheduleDetail';
import HomePage from '@/pages/Home';
import NotFoundPage from '@/pages/NotFound';
import PayrollDetail from '@/pages/PayrollDetail';
import ProfilePage from '@/pages/Profile';
import ProfileEdit from '@/pages/ProfileEdit';
import SalaryPage from '@/pages/Salary';
import SchedulePage from '@/pages/Schedule';
import ScheduleAddPage from '@/pages/ScheduleAdd';
import ScheduleEditPage from '@/pages/ScheduleEdit';
import SignIn from '@/pages/SignIn';
import { checkAuth } from '@/utils/auth';

const PrivateRoute = () => {
  const { pathname, search } = useLocation();

  return checkAuth() ? <Outlet /> : <Navigate to='/signin' replace state={pathname + search} />;
};

const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <PrivateRoute />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: PATH.SCHEDULE,
            children: [
              { index: true, element: <SchedulePage /> },
              { path: PATH.SCHEDULE_DETAIL, element: <DailyScheduleDetail /> },
              { path: PATH.SCHEDULE_ADD, element: <ScheduleAddPage /> },
              { path: PATH.SCHEDULE_EDIT, element: <ScheduleEditPage /> },
            ],
          },
          {
            path: PATH.SALARY,
            children: [
              { index: true, element: <SalaryPage /> },
              { path: PATH.SALARY_DETAIL, element: <PayrollDetail /> },
              { path: PATH.SALARY_CORRECTION_HISTORY, element: <CorrectionHistory /> },
              { path: PATH.SALARY_CORRECTION_DETAIL, element: <CorrectionDetail /> },
              { path: PATH.SALARY_CORRECTION_EDIT, element: <CorrectionEdit /> },
            ],
          },
          {
            path: PATH.PROFILE,
            children: [
              { index: true, element: <ProfilePage /> },
              { path: PATH.PROFILE_EDIT, element: <ProfileEdit /> },
            ],
          },
        ],
      },
    ],
  },
  { path: PATH.SIGNIN, element: <SignIn /> },
]);

const App = () => <RouterProvider router={router} />;
export default App;
