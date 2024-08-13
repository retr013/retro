import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {profileApi} from "../api/api";

export const fetchPosts = createAsyncThunk('posts/getPosts', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response.data
})

const initialState = {
    posts: [],
    loading: false,
    error: ''
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost: (state) => {
            let newPost = {id: 5, body: state.newPostText, likes: 2};
            state.posts.unshift(newPost)
            state.newPostText = ''
        },
        updatePost: (state, action) => {
            state.newPostText = action.payload;
        },
        getPosts: (state) => {
            state.posts = [
                {id: 1, message: 'My first post', likes: 14},
                {id: 2, message: 'My second post', likes: 88},
                {id: 3, message: 'My third post', likes: 228}
            ]
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchPosts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload
            state.error = ''
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false
            state.posts = []
            state.error = action.error.message
        })
    }
})

export const {addPost, updatePost, getPosts} = profileSlice.actions;

export default profileSlice.reducer;

