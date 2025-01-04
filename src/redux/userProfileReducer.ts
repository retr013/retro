// import {createSlice} from "@reduxjs/toolkit";
// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {profileApi} from "../api/api";
// export const fetchProfile = createAsyncThunk('profile/getProfile', async (userId) => {
//     try {
//         const response = await profileApi.fetchProfile(userId)
//         return response.data
//     }
//     catch (err) {
//         console.log(err.message)
//     }
// })
//
// export const updateStatus = createAsyncThunk('profile/updateStatus', async (body) => {
//     try {
//         const response = await profileApi.updateStatus(body)
//         return response.data
//     }
//     catch (err) {
//         console.log(err.message)
//     }
// })
//
// export const fetchStatus = createAsyncThunk('profile/getStatus', async (id) => {
//     try {
//         const response = await profileApi.getStatus(id)
//         return response.data
//     }
//     catch (err) {
//         console.log(err.message)
//     }
// })
//
// export const setProfilePicture = createAsyncThunk('profile/setProfilePicture', async (file) => {
//     try {
//         console.log(file, 'from async thunk')
//         const response = await profileApi.setProfilePicture(file)
//         return response.data
//     }
//     catch (err) {
//         console.log(err.message)
//     }
// })
//
// const initialState = {
//     user: [],
//     userStatus: '',
//     loading: false,
//     error: '',
//     pictureLoading: false
// }
//
// const userProfileSlice = createSlice({
//     name: 'userProfile',
//     initialState,
//     reducers: {
//         updatePageStatus: (state, action) => {
//             state.userStatus = action.payload
//         }
//     },
//     extraReducers: builder => {
//         builder.addCase(fetchProfile.pending, state => {
//             state.loading = true
//         })
//         builder.addCase(fetchProfile.fulfilled, (state, action) => {
//             state.loading = false
//             state.user = action.payload
//             state.error = ''
//         })
//         builder.addCase(fetchProfile.rejected, (state, action) => {
//             state.loading = false
//             state.user = []
//             state.error = action.error.message
//         })
//         builder.addCase(updateStatus.pending, state => {
//             state.loading = true
//         })
//         builder.addCase(updateStatus.rejected, (state, action) => {
//             state.loading = false
//             state.error = action.error.message
//         })
//         builder.addCase(updateStatus.fulfilled, state => {
//             state.loading = false
//         })
//         builder.addCase(fetchStatus.pending, state => {
//             state.loading = true
//         })
//         builder.addCase(fetchStatus.rejected, (state, action) => {
//             state.loading = false
//             state.error = action.error.message
//         })
//         builder.addCase(fetchStatus.fulfilled, (state, action) => {
//             state.loading = false
//             state.userStatus = action.payload
//         })
//         builder.addCase(setProfilePicture.pending, state => {
//             state.loading = true
//             state.pictureLoading = true
//         })
//         builder.addCase(setProfilePicture.rejected, (state, action) => {
//             state.loading = false
//             state.pictureLoading = true
//             state.error = action.error.message
//         })
//         builder.addCase(setProfilePicture.fulfilled, (state, action) => {
//             state.loading = false
//             state.pictureLoading = false
//             state.user.photos = action.payload.data?.photos
//         })
//     }
// })
//
// export const { updatePageStatus } = userProfileSlice.actions;
//
// export default userProfileSlice.reducer;
//
//
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {profileApi} from "../api/api";
import {exists} from "node:fs";

type PhotosType = {
    small: string | null;
    large: string | null;
};

export type StatusType = string | null;

type statusUpdateResponseType = {
    resultCode: number
    messages: string | null,
    fieldsErrors: string[] | null,
        data: object
}

type userProfileType = {
    userId: string;
    fullName: string;
};

type PictureUpdateResponseType = {
    resultCode: number
    messages: string[] | null,
    fieldErrors: string[] | null,
        data: {
            photos: PhotosType
        }

}

export const fetchProfile = createAsyncThunk<userProfileType, string, { rejectValue: string }>(
    'profile/getProfile', async (userId, {rejectWithValue}) => {
    try {
        const response = await profileApi.fetchProfile(userId)
        return response.data
    }
    catch (err: any) {
        if (err.message) {
            return rejectWithValue(err.message);
        }
        return rejectWithValue('Failed to fetch users. Please try again.');
    }
})

export const updateStatus = createAsyncThunk<statusUpdateResponseType, StatusType, { rejectValue: string }>(
    'profile/updateStatus', async (body: StatusType, { rejectWithValue}) => {
    try {
        const response = await profileApi.updateStatus(body)
        return response.data
    }
    catch (err: any) {
        if (err.message) {
            return rejectWithValue(err.message);
        }
        return rejectWithValue('Failed to update status. Please try again.');
    }
})

export const fetchStatus = createAsyncThunk<string, string, { rejectValue: string }>(
    'profile/getStatus', async (id, { rejectWithValue }) => {
    try {
        const response = await profileApi.getStatus(id)
        return response.data
    }
    catch (err: any) {
        if (err.message) {
            return rejectWithValue(err.message);
        }
        return rejectWithValue('Failed to update status. Please try again.');
    }
})

export const setProfilePicture = createAsyncThunk<PictureUpdateResponseType, File, { rejectValue: string }>('profile/setProfilePicture', async (file, {rejectWithValue}) => {
    try {
        console.log(file, 'from async thunk')
        const response = await profileApi.setProfilePicture(file)
        console.log(response)
        return response.data
    }
    catch (err: any) {
        if (err.message) {
            return rejectWithValue(err.message)
        }
        return rejectWithValue('Failed to update photo. Please try again.');
    }
})

type InitialStateType = {
    user: any,
    userStatus: string | null,
    loading: boolean,
    statusLoading: boolean,
    pictureLoading: boolean,
    error: string | null,
}


const initialState: InitialStateType = {
    user: [],
    userStatus: '',
    loading: false,
    statusLoading: false,
    pictureLoading: false,
    error: '',
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        updatePageStatus: (state, action: PayloadAction<string>) => {
            state.userStatus = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProfile.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = ''
        })
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false
            state.user = []
            state.error = action.error?.message || 'Failed to fetch profile. Please try again.'
        })
        builder.addCase(updateStatus.pending, state => {
            state.statusLoading = true
        })
        builder.addCase(updateStatus.rejected, (state, action) => {
            state.statusLoading = false
            state.error = action.error?.message || 'Failed to update status. Please try again.'
        })
        builder.addCase(updateStatus.fulfilled, state => {
            state.statusLoading = false
        })
        builder.addCase(fetchStatus.pending, state => {
            state.statusLoading = true
        })
        builder.addCase(fetchStatus.rejected, (state, action) => {
            state.statusLoading = false
            state.error = action.error?.message || 'Failed to fetch status. Please try again.'
        })
        builder.addCase(fetchStatus.fulfilled, (state, action) => {
            state.statusLoading = false
            state.userStatus = action.payload
        })
        builder.addCase(setProfilePicture.pending, state => {
            state.pictureLoading = true
        })
        builder.addCase(setProfilePicture.rejected, (state, action) => {
            state.pictureLoading = true
            state.error = action.error?.message || 'Failed to update photo. Please try again.'
        })
        builder.addCase(setProfilePicture.fulfilled, (state, action) => {
            state.pictureLoading = false
            state.user.photos = action.payload.data?.photos
        })
    }
})

export const { updatePageStatus } = userProfileSlice.actions;

export default userProfileSlice.reducer;


