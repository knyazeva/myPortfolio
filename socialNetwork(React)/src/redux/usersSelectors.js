import {createSelector} from "reselect";

export const getUsers = (state) => {
    return state.usersPage.users
};

export const getUsersSelector = createSelector(getUsers, (users) => {
    return users.filter(u => u.fullName)   // показываем только тех пользователей, у которых есть имена
});

export const getUsersTotalCount = (state) => {
    return state.usersPage.usersTotalCount
};

export const getUsersLimitPage = (state) => {
    return state.usersPage.usersLimitPage
};

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
};

export const getIsLoading = (state) => {
    return state.usersPage.isLoading
};

export const getIsDisableFollow = (state) => {
    return state.usersPage.isDisableFollow
};