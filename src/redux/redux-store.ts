import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import userProfileReducerSlice from "./userProfileReducer";
import authReducerSlice from "./authReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const reducers = combineReducers(
    {
        profile: profileReducer,
        dialogsReducer,
        users: usersReducer,
        userProfile: userProfileReducerSlice,
            auth: authReducerSlice
    }
);
// @ts-ignore
const store = configureStore({reducer: reducers});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;
