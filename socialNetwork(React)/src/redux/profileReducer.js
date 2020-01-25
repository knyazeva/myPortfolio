import {profileAPI} from "../api/api";
const ADD_POST = 'profile/ADD_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';

let initialState = {
    postsData: [
        {id: 1, message: "Hello!!!", likes: "5"},
        {id: 2, message: "It is my first post =)", likes: "3"}
    ],
    userProfile: null,
    isMyProfile: false
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {id: 3, message: action.dataForm, likes: 0};
            return {
                ...state,
                postsData: [newPost, ...state.postsData]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.profile,
                isMyProfile: action.isMyProfile
            };
        default:
            return state;
    }
};


export const addPostAC = (dataForm) => ({type: ADD_POST, dataForm});
export const setUserProfileAC = (profile, isMyProfile) => ({type: SET_USER_PROFILE, profile, isMyProfile});


export const getMyProfileTC = () => async (dispatch) => {  // получить профиль авторизованного пользователя
    const response = await profileAPI.getMyProfile();
    dispatch(setUserProfileAC(response.data, true))
};
export const getProfileTC = (userId) => async (dispatch) => {  // получить профиль любого человека по ID
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfileAC(response.data, false))
};
export const saveMyProfileTC = (data) => (dispatch) => {  // сохранение изменений в профиле
    profileAPI.saveMyProfile(data)
        .then(() => {
        dispatch(getMyProfileTC());
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'})
    });
};
export const saveMyPhotoTC = (data) => (dispatch) => {
    profileAPI.saveMyProfile(data)
        .then(() => {
            dispatch(getMyProfileTC());
        });
};


export default profileReducer;
