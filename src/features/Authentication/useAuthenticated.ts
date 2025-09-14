import { useAppSelector } from '@/store';
import { selectIsLoggedIn } from '@/features/Authentication/selectors';
import { authenticationApi } from '@/features/Authentication/authenticationApi';

const useAuthenticated = (): boolean => {
  authenticationApi.useGetMeQuery(undefined);

  return useAppSelector(selectIsLoggedIn);
};

export default useAuthenticated;
