import { useAppSelector } from './store';
import useAuthenticated from './features/Authentication/useAuthenticated';
import { selectUserId } from './features/Authentication/selectors';
import {
  useGetContactsQuery,
  useGetMessagesQuery,
} from './features/Chat/chatPageApi';
import { selectCurrentPollingParams } from './features/Chat/selectors';
import { skipToken } from '@reduxjs/toolkit/query';

import Navigation from './features/Navigation';
import Footer from './components/Footer';
import AppToaster from './components/Toaster';
import styled from 'styled-components';
import Spinner from './components/Spinner';

const App = () => {
  const isAuthenticated = useAuthenticated();

  const userId = useAppSelector(selectUserId);
  const params = useAppSelector(selectCurrentPollingParams);
  const messageParams = !!params && !!userId ? { params, userId } : skipToken;

  useGetContactsQuery(userId.length ? userId : skipToken);
  useGetMessagesQuery(messageParams, {
    pollingInterval: 2000,
  });

  return isAuthenticated ? (
    <AppWrapper>
      <Navigation />
      <Footer />
      <AppToaster />
    </AppWrapper>
  ) : (
    <Spinner variant="large" isDark />
  );
};

const AppWrapper = styled.div`
  overflow: hidden;
`;

export default App;
