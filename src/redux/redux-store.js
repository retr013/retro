import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import userProfileReducerSlice from "./userProfileReducer";
import authReducerSlice from "./authReducer";



let reducers = combineReducers(
    {
        profile: profileReducer,
        dialogsReducer,
        users: usersReducer,
        userProfile: userProfileReducerSlice,
            auth: authReducerSlice
    }
);

let store = configureStore({reducer: reducers});

window.store = store;

export default store;