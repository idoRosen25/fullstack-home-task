import { createSlice } from '@reduxjs/toolkit';
import { AlertProps, JpUser } from '../../../types';

interface PostsState {
  selectedUser: JpUser | null;
  isCreatePostModalOpen: boolean;
  alerts: AlertProps[];
}

const initialState: PostsState = {
  selectedUser: null,
  isCreatePostModalOpen: false,
  alerts: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setIsCreatePostModalOpen: (state, action) => {
      state.isCreatePostModalOpen = action.payload;
    },
    addAlert: (state, action) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload,
      );
    },
  },
});

export const {
  setSelectedUser,
  setIsCreatePostModalOpen,
  addAlert,
  removeAlert,
} = postsSlice.actions;

export default postsSlice.reducer;
