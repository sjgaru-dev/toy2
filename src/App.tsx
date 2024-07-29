import { useEffect } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { auth } from './api';
import { PATH } from './constants/path';
import RootLayout from './layouts/Root';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import ProfilePage from './pages/Profile';
import SalaryPage from './pages/Salary';
import SchedulePage from './pages/Schedule';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: PATH.SCHEDULE, element: <SchedulePage /> },
      { path: PATH.SALARY, element: <SalaryPage /> },
      {
        path: PATH.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
]);

const App = () => {
  useEffect(() => {
    (async () => {
      await auth.authStateReady(); // wait for firebase
    })();
  }, []);
  <RouterProvider router={router} />;
};

export default App;
