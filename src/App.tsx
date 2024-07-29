import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
      { path: '/schedule', element: <SchedulePage /> },
      { path: '/salary', element: <SalaryPage /> },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
