import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import { baseApi } from './baseApi';
import { chats } from './features/Chat/chatSlice';
import { mentorsFilter } from '@/features/MentorPage/mentorsFilterSlice';
import { user } from './features/Authentication/userSlice';

const rootReducer = combineReducers({
  [user.name]: user.reducer,
  [mentorsFilter.name]: mentorsFilter.reducer,
  [chats.name]: chats.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ immutableCheck: true }).concat(baseApi.middleware),
    preloadedState,
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
