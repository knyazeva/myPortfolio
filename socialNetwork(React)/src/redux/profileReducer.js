import {profileAPI} from "../api/api";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_POSTS = "profile/SET_POST";
const ADD_POST = "profile/ADD_POST";
const ADD_LIKE = "profile/ADD_LIKE";
const DELETE_LIKE = "profile/DELETE_LIKE";

let initialState = {
    userProfile: null,
    isMyProfile: false,
    postsData: []
};

const profileReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
};

// Action Creators
export const addPostAC = (dataForm) => ({type: ADD_POST, dataForm});
export const setPostsAC = (data) => ({type: SET_POSTS, data});
export const setUserProfileAC = (profile, isMyProfile) => ({type: SET_USER_PROFILE, profile, isMyProfile});
export const addLikeAC = (postId) => ({type: ADD_LIKE, postId});
export const deleteLikeAC = (postId) => ({type: DELETE_LIKE, postId});

// Thunk Creators
export const getMyProfileTC = () => async (dispatch) => {  // получить профиль авторизованного пользователя
    const response = await profileAPI.getMyProfile();
    dispatch(setUserProfileAC(response.data, true));
    dispatch(setPostsAC(response.data.posts));
};
export const getProfileTC = (userId) => async (dispatch) => {  // получить профиль любого человека по ID
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfileAC(response.data, false));
    dispatch(setPostsAC(response.data.posts));
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
export const addPostTC = (dataForm, oldDataPosts, userProfile) => (dispatch) => {  // добавляем новый пост
    dataForm.posts.likes = 0;
    dataForm.posts.id = oldDataPosts.length + 1;
    dispatch(addPostAC(dataForm.posts));
    let newData = {...userProfile, posts: store.getState().profilePage.postsData};
    profileAPI.saveMyProfile(newData)
};
export const addLikeTC = (allDataAboutItem, numLike, userData) => (dispatch, getState) => {  // Добавить лайк
    setLike(dispatch, getState, addLikeAC, allDataAboutItem, numLike, userData);
};
export const deleteLikeTC = (allDataAboutItem, numLike, userData) => (dispatch, getState) => {  // Удалить лайк
    setLike(dispatch, getState, deleteLikeAC, allDataAboutItem, numLike, userData);

};

// Common Functions
const setLike = (dispatch, getState, actionCreator, allDataAboutItem, numLike, userData) => {  // общая функция для добавления/удаления лайков
    dispatch(actionCreator(allDataAboutItem.id));
    let newPosts = store.getState().profilePage.postsData.map((item) => {
        return (
            item.id === allDataAboutItem.id ? {id: item.id, textPost: item.textPost, likes: numLike, myLikes: item.myLikes} : item
        )
    });

    profileAPI.saveProfile(userData.id, {...userData, posts: newPosts}).then((response) => {
        dispatch(setPostsAC(response.data.posts));
    });
};



export default profileReducer;
