/* eslint-disable no-return-await */
/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserApi } from '../../actions/userAction';

export const userRegister = createAsyncThunk('user/register', async (user) => await UserApi.register(user));

const initialState = {
  currentUser: null,
  users: [],
  loading: false,
  step: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.currentUser = action.payload;
      state.step = true;
    },
    createUserList: (state, action) => {
      state.users.push(action.payload);
    },
    addUserList: (state, action) => {
      state.users = action.payload;
    },
    updateUserFromList: (state, action) => {
      state.users = state.users.map((item) => {
        item._id === action.payload._id ? action.payload : item;
      });
    },
    removeUserFromList: (state, action) => {
      state.users = state.users.filter((item) => item._id !== action.payload._id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => (state.loading = true))
      .addCase(userRegister.fulfilled, (state) => (state.loading = false));
  },
});

export const { addUser, createUserList, updateUserFromList, removeUserFromList, addUserList } = userSlice.actions;
export default userSlice.reducer;
