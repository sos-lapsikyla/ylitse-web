import { Route, Routes } from 'react-router-dom';

import ChatPage from '@/features/Chat';
import HomePage from '@/features/HomePage';
import MentorPage from '@/features/MentorPage';
import { Logout } from '@/features/Authentication/components/Logout';
import { Navbar } from './Navbar';
import ProfilePage from '@/features/ProfilePage';

const Navigation = () => (
  <>
    <Navbar />

    <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/mentors" element={<MentorPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </>
);

export default Navigation;
