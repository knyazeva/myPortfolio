import {usersAPI} from "../api/api";
const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const UPLOAD_USERS = 'users/UPLOAD_USERS';
const SET_USERS_TOTAL_COUNT = 'users/SET_USERS_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const TOGGLE_LOADING = 'users/TOGGLE_LOADING';
const SET_DISABLE_FOLLOW = 'users/SET_DISABLE_FOLLOW';

let initialState = {
    users: [],
    usersTotalCount: 0,
    usersLimitPage: 7,
    currentPage: 1,
    isLoading: false,
    isDisableFollow: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => { return user.id === action.userId ? {...user, followed: true} : user })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => { return user.id === action.userId ? {...user, followed: false} : user })
            };
        case UPLOAD_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                usersTotalCount: action.number
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.number
            };
        case TOGGLE_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case SET_DISABLE_FOLLOW:
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



export const followAC = (userId) => ({type: FOLLOW, userId});
export const unFollowAC = (userId) => ({type: UNFOLLOW, userId});
export const uploadUsersAC = (users) => ({type: UPLOAD_USERS, users});
export const setUsersTotalCountAC = (number) => ({type: SET_USERS_TOTAL_COUNT, number});
export const setCurrentPageAC = (number) => ({type: SET_CURRENT_PAGE, number});
export const toggleLoadingAC = (isLoading) => ({type: TOGGLE_LOADING, isLoading});
export const setDisableFollowAC = (isDisable, userId) => ({type: SET_DISABLE_FOLLOW, isDisable, userId});


export const getUsersTC = (currentPage, usersLimitPage) => async (dispatch) => {  // получить всех пользователей
    dispatch(toggleLoadingAC(true));

    const response1 = await usersAPI.getUsers();
    dispatch(setUsersTotalCountAC(response1.data.length));

    const response2 = await usersAPI.getLimitPage(currentPage, usersLimitPage);
    dispatch(uploadUsersAC(response2.data));
    dispatch(toggleLoadingAC(false));
};
export const setCurrentPageTC = (page, usersLimitPage) => async (dispatch) => {  // установка текущей страницы пользователей
    dispatch(toggleLoadingAC(true));

    const response = await usersAPI.getCurrentPage(page, usersLimitPage);
    dispatch(uploadUsersAC(response.data));

    dispatch(setCurrentPageAC(page));
    dispatch(toggleLoadingAC(false));
};
export const unFollowTC = (userId, allInfoUser) => async (dispatch) => {  // отписаться от пользователя
    dispatch(setDisableFollowAC(true, userId));
    await usersAPI.putUnFollow(userId, allInfoUser);
    dispatch(setDisableFollowAC(false, userId));
    dispatch(unFollowAC(userId))
};
export const followTC = (userId, allInfoUser) => async (dispatch) => {  // подписаться на пользователя
    dispatch(setDisableFollowAC(true, userId));
    await usersAPI.putFollow(userId, allInfoUser);
    dispatch(setDisableFollowAC(false, userId));
    dispatch(followAC(userId))
};


export default usersReducer;