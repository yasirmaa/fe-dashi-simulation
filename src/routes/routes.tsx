import RootLayout from '@/components/layouts/RootLayout';
import DashboardPage from '@/pages/admin/DashboardPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);
