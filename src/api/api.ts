import axios, {AxiosInstance} from "axios";
import {LoginFormInputs} from "../components/Login/Login";
import {StatusType} from "../redux/userProfileReducer";

// Create a single Axios instance for API requests
const instance: AxiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "Authorization": "Bearer 2df49ef8-c08c-455f-b794-8e8d20ecd4f9",
        "API-KEY": "bba57fdc-d063-4162-a4dd-309f6f9ec9a4",
    }
})

export const followUserApi = {
    followUser(userId: number) {
        return instance.post(`follow/${userId}`, {})
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    fetchUsers(count: number) {
        return instance.get(`users?count=${count ? count : 20}`)
    },
}

export const profileApi = {
    fetchProfile(id: string) {
        return instance.get('profile/' + id)
    },
    updateStatus(statusText: StatusType) {
        return instance.put('profile/status', {status: statusText})
    },
    getStatus(id: string) {
        return instance.get('profile/status/' + id)
    },
    setProfilePicture(file: File) {
        const formData = new FormData();
        formData.append('image', file)
        return instance.put('profile/photo', formData)
    }
}
export const authMeApi = {
    authUser() {
        return instance.get('auth/me')
    },
    login(data: LoginFormInputs) {
        return instance.post('auth/login', data)
    },
    logout() {
        return instance.delete('auth/login')
    }
}
