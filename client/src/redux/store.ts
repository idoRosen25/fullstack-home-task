import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './features/post/postSlice';
import { postApi } from './api/posts';
import { userApi } from './api/users';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postApi.middleware)
      .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
