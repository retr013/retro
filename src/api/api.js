import axios, {AxiosError} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "Authorization": "Bearer 2df49ef8-c08c-455f-b794-8e8d20ecd4f9",
        "API-KEY": "bba57fdc-d063-4162-a4dd-309f6f9ec9a4",
    }
})

export const followUserApi = {
    followUser(userId) {
        return instance.post(`follow/${userId}`, {})
    },
    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`)
    },
    fetchUsers(count) {
        return instance.get(`users?count=${count ? count : 20}`)
    },
}

export const profileApi = {
    fetchProfile(id) {
        return instance.get('profile/' + id)
    },
    updateStatus(statusText) {
        return instance.put('profile/status', {status: statusText})
    },
    getStatus(id) {
        return instance.get('profile/status/' + id)
    }
}
export const authMeApi = {
    authUser() {
        return instance.get('auth/me')
    },
    login(data) {
        return instance.post('auth/login', data)
    },
    logout() {
        return instance.delete('auth/login')
    }
}
