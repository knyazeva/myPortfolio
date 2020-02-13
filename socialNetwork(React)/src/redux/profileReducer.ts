import {profileAPI} from "../api/api";
import { profileType, postType } from "../types/types";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_POSTS = "profile/SET_POST";
const ADD_POST = "profile/ADD_POST";
const ADD_LIKE = "profile/ADD_LIKE";
const DELETE_LIKE = "profile/DELETE_LIKE";
const CLEAR_PROFILE = "profile/CLEAR_PROFILE";

let initialState = {
    userProfile: null as profileType | null,
    isMyProfile: false as boolean,
    postsData: [] as Array<postType>
};

type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action): initialStateType => {
    switch (action.type) {
        case ADD_LIKE:
            return {
                ...state,
                postsData: state.postsData.map((post) => {return post.id === action.postId ? {...post, myLikes: true} : post})
            };
        case DELETE_LIKE:
            return {
                ...state,
                postsData: state.postsData.map((post) => {return post.id === action.postId ? {...post, myLikes: false} : post})
            };
        case SET_POSTS:
            return {
                ...state,
                postsData: action.data
            };
        case ADD_POST:
            return {
                ...state,
                postsData: [...state.postsData, action.dataForm]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.profile,
                isMyProfile: action.isMyProfile
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                userProfile: null
            };
        default:
            return state;
    }
};

// Action Creators
type addPostACType = {
    type: typeof ADD_POST,
    dataForm: postType
}
type setPostsACType = {
    type: typeof SET_POSTS,
    data: Array<postType>
}
type setUserProfileAC = {
    type: typeof SET_USER_PROFILE,
    profile: profileType,
    isMyProfile: boolean
}
type addLikeACType = {
    type: typeof ADD_LIKE,
    postId: number
}
type deleteLikeACType = {
    type: typeof DELETE_LIKE,
    postId: number
}
type clearProfileACType = {
    type: typeof CLEAR_PROFILE
}
export const addPostAC = (dataForm: postType): addPostACType => ({type: ADD_POST, dataForm});
export const setPostsAC = (data: Array<postType>): setPostsACType => ({type: SET_POSTS, data});
export const setUserProfileAC = (profile: profileType, isMyProfile: boolean): setUserProfileAC => ({type: SET_USER_PROFILE, profile, isMyProfile});
export const addLikeAC = (postId: number): addLikeACType => ({type: ADD_LIKE, postId});
export const deleteLikeAC = (postId: number): deleteLikeACType => ({type: DELETE_LIKE, postId});
export const clearProfileAC = (): clearProfileACType => ({type: CLEAR_PROFILE});

// Thunk Creators
export const getMyProfileTC = () => async (dispatch) => {  // получить профиль авторизованного пользователя
    const response = await profileAPI.getMyProfile();
    dispatch(setUserProfileAC(response.data, true));
    dispatch(setPostsAC(response.data.posts));
};
export const getProfileTC = (userId: number) => async (dispatch) => {  // получить профиль любого человека по ID
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfileAC(response.data, false));
    dispatch(setPostsAC(response.data.posts));
};
export const saveMyProfileTC = (data: profileType) => (dispatch) => {  // сохранение изменений в профиле
    profileAPI.saveMyProfile(data)
        .then(() => {
        dispatch(getMyProfileTC());
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'})
    });
};
export const saveMyPhotoTC = (data: profileType) => (dispatch) => {
    profileAPI.saveMyProfile(data)
        .then(() => {
            dispatch(getMyProfileTC());
        });
};
export const addPostTC = (dataForm: postType, oldDataPosts: Array<postType>, userProfile: profileType) => (dispatch, getState) => {  // добавляем новый пост
    dataForm.likes = 0;
    dataForm.id = oldDataPosts.length + 1;
    console.log(dataForm);
    dispatch(addPostAC(dataForm));
    let newData = {...userProfile, posts: getState().profilePage.postsData};
    profileAPI.saveMyProfile(newData)
};
export const addLikeTC = (allDataAboutItem: postType, numLike, userData: profileType) => (dispatch, getState) => {  // Добавить лайк
    setLike(dispatch, getState, addLikeAC, allDataAboutItem, numLike, userData);
};
export const deleteLikeTC = (allDataAboutItem: postType, numLike: number, userData: profileType) => (dispatch, getState) => {  // Удалить лайк
    setLike(dispatch, getState, deleteLikeAC, allDataAboutItem, numLike, userData);

};

// Common Functions
const setLike = (dispatch, getState, actionCreator, allDataAboutItem, numLike, userData) => {  // общая функция для добавления/удаления лайков
    dispatch(actionCreator(allDataAboutItem.id));
    let newPosts = getState().profilePage.postsData.map((item) => {
        return (
            item.id === allDataAboutItem.id ? {id: item.id, textPost: item.textPost, likes: numLike, myLikes: item.myLikes} : item
        )
    });

    profileAPI.saveProfile(userData.id, {...userData, posts: newPosts}).then((response) => {
        dispatch(setPostsAC(response.data.posts));
    });
};



export default profileReducer;
