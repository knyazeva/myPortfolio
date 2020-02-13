import axios from "axios";
import {communitiesType, profileType} from "../types/types";

const instance  = axios.create({});

instance.defaults.baseURL = location.protocol + '//' + location.hostname + ':3001/';

export const usersAPI = {
    getCurrentPage(numberPage: number, limitPage: number) {
        return instance.get(`users?_page=${numberPage}&_limit=${limitPage}`)
    },
    getLimitPage(currentPage: number, usersLimitPage: number) {
        return instance.get(`users?_page=${currentPage}&_limit=${usersLimitPage}`)
    },
    getUsers() {
        return instance.get('users')
    },
    putUnFollow(userId: number, allInfoUser: profileType) {
        return instance.put(`users/${userId}`, {...allInfoUser, 'followed': false})
    },
    putFollow(userId: number, allInfoUser: profileType) {
        return instance.put(`users/${userId}`, {...allInfoUser, 'followed': true})
    }
};

export const profileAPI = {
    getMyProfile() {
        return instance.get('myProfile/1')
    },
    getProfile(userId: number) {
        return instance.get(`users/${userId}`)
    },
    saveMyProfile(data: profileType) {
        return instance.put('myProfile/1', data)
    },
    saveProfile(userId: number, data: profileType) {
        return instance.put(`users/${userId}`, data)
    }
};

export const newsAPI = {
    getNews(profileName: string) {
        return instance.get(`news?${profileName}`)
    },
    getPortionNews(startPortion: number, endPortion: number, profileName: string) {
        return instance.get(`news?${profileName}&_start=${startPortion}&_end=${endPortion}&_sort=id&_order=desc`)
    },
    putLike(newsId: number, data: communitiesType) {
        return instance.put(`news/${newsId}`, data)
    }
};

export const communitiesAPI = {
    getCommunities() {
        return instance.get("communities")
    },
    getCommunityProfile(comId: number) {
        return instance.get(`communities/${comId}`)
    },
    putUnFollow(comId: number, allInfoUser: communitiesType) {
        return instance.put(`communities/${comId}`, {...allInfoUser, 'followed': false})
    },
    putFollow(comId: number, allInfoUser: communitiesType) {
        return instance.put(`communities/${comId}`, {...allInfoUser, 'followed': true})
    }
};