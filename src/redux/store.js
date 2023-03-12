import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";


export const store = configureStore({
    devTools : {
        trace : true
    },
    reducer : {
        user: userSlice
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const rootState = typeof store.getState ;
export const AppDispatch = typeof store.dispatch
