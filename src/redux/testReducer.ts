import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


type InitialStateType = {
    isAuth: boolean
    userId: null | number
    loading: boolean
    error: string
    initialized: boolean
    userInfo: {
        id: null | number
        email: string
        login: string
    }
}

type numberArrary = Array<number>

const array : numberArrary = [1, 3 , 4, 5]

const initialState : InitialStateType = {
    isAuth: true,
    userId: null,
    loading: false,
    error: '',
    initialized: false,
    userInfo: {
        id: null,
        email: '',
        login: '',
    }
}
