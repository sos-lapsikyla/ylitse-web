import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import ChatPage from '@/features/Chat';
import HomePage from '@/features/HomePage';
import { Logout } from '@/features/Authentication/components/Logout';
import MentorPage from '@/features/MentorPage';
import { Navbar } from './Navbar';
import ProfilePage from '@/features/ProfilePage';
import UsersPage from '../Admin/UserManagement';

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/chat', element: <ChatPage /> },
      { path: '/mentors', element: <MentorPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/users', element: <UsersPage /> },
      { path: '/logout', element: <Logout /> },
      { path: '/users', element: <HomePage /> },
      { path: '/statistics', element: <HomePage /> },
      { path: '/topics', element: <HomePage /> },
      { path: '/reports', element: <HomePage /> },
      { path: '*', element: <HomePage /> },
    ],
  },
]);

const Navigation = () => <RouterProvider router={router} />;

export default Navigation;
