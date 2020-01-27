import * as axios from "axios";

const instance  = axios.create({});

instance.defaults.baseURL = location.protocol + '//' + location.hostname + ':3001/';

export const usersAPI = {
    getCurrentPage(numberPage, limitPage) {
        return instance.get(`users?_page=${numberPage}&_limit=${limitPage}`)
    },
    getLimitPage(currentPage, usersLimitPage) {
        return instance.get(`users?_page=${currentPage}&_limit=${usersLimitPage}`)
    },
    getUsers() {
        return instance.get('users')
    },
    putUnFollow(userId, props) {
        return instance.put(`users/${userId}`, {...props, 'followed': false})
    },
    putFollow(userId, props) {
        return instance.put(`users/${userId}`, {...props, 'followed': true})
    }
};

export const profileAPI = {
    getMyProfile() {
        return instance.get('myProfile/1')
    },
    getProfile(userId) {
        return instance.get(`users/${userId}`)
    },
    saveMyProfile(data) {
        return instance.put('myProfile/1', {...data})
    }
};