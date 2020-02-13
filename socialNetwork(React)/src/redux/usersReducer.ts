import {usersAPI} from "../api/api";
import {getProfileTC} from "./profileReducer";
import { profileType } from "../types/types";
const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const UPLOAD_USERS = 'users/UPLOAD_USERS';
const SET_USERS_TOTAL_COUNT = 'users/SET_USERS_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const TOGGLE_LOADING = 'users/TOGGLE_LOADING';
const SET_DISABLE_FOLLOW = 'users/SET_DISABLE_FOLLOW';

let initialState = {
    users: [] as Array<profileType>,
    usersTotalCount: 0 as number,
    usersLimitPage: 7 as number,
    currentPage: 1 as number,
    isLoading: false as boolean,
    isDisableFollow: [] as Array<number>
};

type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action): initialStateType => {
    switch (action.type) {
        case FOLLOW:  // подписаться на пользователя
            return {
                ...state,
                users: state.users.map(user => { return user.id === action.userId ? {...user, followed: true} : user })
            };
        case UNFOLLOW:  // отписаться от пользователя
            return {
                ...state,
                users: state.users.map(user => { return user.id === action.userId ? {...user, followed: false} : user })
            };
        case UPLOAD_USERS:  // загрузить пользователей
            return {
                ...state,
                users: action.users
            };
        case SET_USERS_TOTAL_COUNT:  // задать общее количество пользователей
            return {
                ...state,
                usersTotalCount: action.number
            };
        case SET_CURRENT_PAGE:  // задать номер текущей страницы
            return {
                ...state,
                currentPage: action.number
            };
        case TOGGLE_LOADING:  // активность/неактивность лоадинга
            return {
                ...state,
                isLoading: action.isLoading
            };
        case SET_DISABLE_FOLLOW:  // установить кнопку неактивной, пока идет запрос/ответ от сервера
            return {
                ...state,
                isDisableFollow: action.isDisable
                    ? [...state.isDisableFollow, action.userId]
                    : state.isDisableFollow.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};


// Action Creators
type followACType = {
    type: typeof FOLLOW,
    userId: number
}
type unFollowACType = {
    type: typeof UNFOLLOW,
    userId: number
}
type uploadUsersACType = {
    type: typeof UPLOAD_USERS
    users: Array<profileType>
}
type setUsersTotalCountACType = {
    type: typeof SET_USERS_TOTAL_COUNT,
    number: number
}
type setCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE,
    number: number
}
type toggleLoadingACType = {
    type: typeof TOGGLE_LOADING,
    isLoading: boolean
}
type setDisableFollowACType = {
    type: typeof SET_DISABLE_FOLLOW,
    isDisable: boolean,
    userId: number
}
export const followAC = (userId: number): followACType => ({type: FOLLOW, userId});
export const unFollowAC = (userId: number): unFollowACType => ({type: UNFOLLOW, userId});
export const uploadUsersAC = (users: Array<profileType>): uploadUsersACType => ({type: UPLOAD_USERS, users});
export const setUsersTotalCountAC = (number: number): setUsersTotalCountACType => ({type: SET_USERS_TOTAL_COUNT, number});
export const setCurrentPageAC = (number: number): setCurrentPageACType => ({type: SET_CURRENT_PAGE, number});
export const toggleLoadingAC = (isLoading: boolean): toggleLoadingACType => ({type: TOGGLE_LOADING, isLoading});
export const setDisableFollowAC = (isDisable: boolean, userId: number): setDisableFollowACType => ({type: SET_DISABLE_FOLLOW, isDisable, userId});

// Thunk Creators
export const getUsersTC = (currentPage: number, usersLimitPage: number) => async (dispatch) => {  // получить всех пользователей
    dispatch(toggleLoadingAC(true));

    const response1 = await usersAPI.getUsers();
    dispatch(setUsersTotalCountAC(response1.data.length));

    const response2 = await usersAPI.getLimitPage(currentPage, usersLimitPage);
    dispatch(uploadUsersAC(response2.data));
    dispatch(toggleLoadingAC(false));
};
export const setCurrentPageTC = (page: number, usersLimitPage: number) => async (dispatch) => {  // установка текущей страницы пользователей
    dispatch(toggleLoadingAC(true));

    const response = await usersAPI.getCurrentPage(page, usersLimitPage);
    dispatch(uploadUsersAC(response.data));

    dispatch(setCurrentPageAC(page));
    dispatch(toggleLoadingAC(false));
};
export const unFollowTC = (userId: number, allInfoUser: profileType) => (dispatch) => {  // отписаться от пользователя
    followUnfollow(dispatch, usersAPI.putUnFollow.bind(usersAPI), unFollowAC, userId, allInfoUser);
};
export const followTC = (userId: number, allInfoUser: profileType) => async (dispatch) => {  // подписаться на пользователя
    followUnfollow(dispatch, usersAPI.putFollow.bind(usersAPI), followAC, userId, allInfoUser);
};

// Common Functions
const followUnfollow = async (dispatch, apiMethod, actionCreator, userId, allInfoUser) => {  // общая функция для подписки и отписки
    dispatch(setDisableFollowAC(true, userId));
    await apiMethod(userId, allInfoUser);
    dispatch(setDisableFollowAC(false, userId));
    dispatch(actionCreator(userId));
    dispatch(getProfileTC(userId))
};


export default usersReducer;