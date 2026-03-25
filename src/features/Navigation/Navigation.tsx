import { createBrowserRouter, Outlet } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import styled from 'styled-components';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import {
  FOOTER_HEIGHT,
  MOBILE_AND_TABLET_CONTENT_HEIGHT,
  NAVIGATION_HEIGHT,
  palette,
} from '@/components/constants';

import ChatPage from '@/features/Chat';
import HomePage from '@/features/HomePage';
import { Logout } from '@/features/Authentication/components/Logout';
import MentorPage from '@/features/MentorPage';
import { Navbar } from './Navbar';
import ProfilePage from '@/features/ProfilePage';
import UsersPage from '../UserManagement';
import SkillsPage from '../SkillsPage';
import ReportsPage from '../ReportsPage';

const Layout = () => {
  const { isTablet } = useGetLayoutMode();

  return (
    <>
      <Navbar />
      <PageContainer $isTablet={isTablet}>
        <Outlet />
      </PageContainer>
    </>
  );
};

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
      { path: '/topics', element: <SkillsPage /> },
      { path: '/reports', element: <ReportsPage /> },
      { path: '*', element: <HomePage /> },
    ],
  },
]);

const Navigation = () => <RouterProvider router={router} />;

const PageContainer = styled.div<{ $isTablet: boolean }>`
  background-color: ${palette.blueLight};
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: ${({ $isTablet }) =>
    $isTablet
      ? MOBILE_AND_TABLET_CONTENT_HEIGHT
      : `calc(100vh - ${NAVIGATION_HEIGHT} - ${FOOTER_HEIGHT})`};
  position: relative;
  width: 100vw;
`;

export default Navigation;
