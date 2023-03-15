import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserApi } from '../../actions/userAction';

export const userRegister = createAsyncThunk('user/register', async (user) => UserApi.register(user));
export const fetchUsersList = createAsyncThunk('user/listUsers', async () => {
  const result = await UserApi.getUsers();
  console.log(result);
  return result;
});


const initialState = {
  currentUser: null,
  users: [],
  loading: false,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.currentUser = action.payload;
    },refrech: (state, action) => {
      state.users = action.payload;
    },
    addUserList: (state, action) => {
      state.users = action.payload;
    },
    searchUserList: (state, action) => {
      state.users = action.payload;
    },
    createUserList: (state, action) => {
      state.users.push(action.payload);
    },
    updateUserFromList: (state, action) => {
      // eslint-disable-next-line array-callback-return
      state.users = state.users.map((item) => {
        // eslint-disable-next-line no-unused-expressions
        item._id === action.payload._id ? action.payload : item;
      });
    },
    removeUserFromList: (state, action) => {
      state.users = state.users.filter((item) => item._id !== action.payload._id);
    },
  },
  extraReducers: (builder) => {
    builder
      // eslint-disable-next-line no-return-assign
      .addCase(userRegister.pending, (state) => (state.loading = true))
      // eslint-disable-next-line no-return-assign
      .addCase(userRegister.fulfilled, (state) => (state.loading = false))
      // eslint-disable-next-line no-return-assign
      .addCase(fetchUsersList.pending, (state) => (state.loading = true))
      // eslint-disable-next-line no-return-assign
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      });
  },
});

export const { addUser, createUserList, updateUserFromList, removeUserFromList,addUserList ,refrech} = userSlice.actions;
export default userSlice.reducer;
