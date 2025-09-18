import { createApi } from '@reduxjs/toolkit/query/react';
import { refreshingBaseQuery } from '@/utils/http';

export const baseApi = createApi({
  baseQuery: refreshingBaseQuery,
  reducerPath: 'api',
  tagTypes: ['mentors', 'myuser', 'apiversion', 'users', 'accounts'],
  endpoints: () => ({}),
});
