import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { authenticationApi } from '../authenticationApi';

import Spinner from '@/components/Spinner';

export const Logout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(authenticationApi.endpoints.logout.initiate());
  }, [dispatch]);

  return <Spinner variant="large" />;
};
