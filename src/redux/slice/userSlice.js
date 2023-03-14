import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserApi,GetUsers } from "src/actions/userAction";


export const userRegister = createAsyncThunk('user/register',async (user) => await UserApi.register(user));

const initialState = {
    currentUser: null,
    users : [],
    loading: false
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state,action) => {
            state.currentUser= action.payload;
        },
        createUserList: (state,action)=>{
            state.users.push(action.payload);
        },
        updateUserFromList: (state,action) => {
            state.users = state.users.map((item)=>{
                item._id === action.payload._id ? action.payload : item
            });
        },
        removeUserFromList: (state,action) => {
            state.users = state.users.filter((item)=> item._id !== action.payload._id);
        }, 
    
    },
    extraReducers: (builder) => {
        builder.addCase(userRegister.pending, (state) => state.loading=true )
               .addCase(userRegister.fulfilled, (state) => state.loading=false)
    } 

})

export const {addUser,createUserList,updateUserFromList,removeUserFromList} = userSlice.actions;
export default userSlice.reducer;