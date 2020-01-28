import {profileAPI} from "../api/api";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_POSTS = "profile/SET_POST";
const ADD_POST = "profile/ADD_POST";
const ADD_LIKE = "profile/ADD_LIKE";
const DELETE_LIKE = "profile/DELETE_LIKE";

let initialState = {
    userProfile: null,
    isMyProfile: false,
    postsData: [],
    myLikes: []
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LIKE:
            return {
                ...state,
                myLikes: [...state.myLikes, action.postId]
            };
        case DELETE_LIKE:
            return {
                ...state,
                myLikes: state.myLikes.filter(id => id !== action.postId)
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
                isMyProfile: action.isMyProfile,
                myLikes: action.likes
            };
        default:
            return state;
    }
};


export const addPostAC = (dataForm) => ({type: ADD_POST, dataForm});
export const setPostsAC = (data) => ({type: SET_POSTS, data});
export const setUserProfileAC = (profile, isMyProfile, likes = []) => ({type: SET_USER_PROFILE, profile, isMyProfile, likes});
export const addLikeAC = (postId) => ({type: ADD_LIKE, postId});
export const deleteLikeAC = (postId) => ({type: DELETE_LIKE, postId});


export const getMyProfileTC = () => async (dispatch) => {  // получить профиль авторизованного пользователя
    const response = await profileAPI.getMyProfile();
    dispatch(setUserProfileAC(response.data, true));
    dispatch(setPostsAC(response.data.posts));
};
export const getProfileTC = (userId) => async (dispatch) => {  // получить профиль любого человека по ID
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfileAC(response.data, false, response.data.likes));
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
export const addLikeTC = (postId, numLike, userData) => (dispatch) => {
    setLike(dispatch, addLikeAC, postId, numLike, userData);
};
export const deleteLikeTC = (postId, numLike, userData) => (dispatch) => {
    setLike(dispatch, deleteLikeAC, postId, numLike, userData);

};


const setLike = (dispatch, actionCreator, postId, numLike, userData) => {
    dispatch(actionCreator(postId));
    let newPosts = userData.posts.map((item) => {
        return (
            item.id === postId ? {id: item.id, textPost: item.textPost, likes: numLike} : item
        )
    });

    let newData = {...userData, posts: newPosts, likes: store.getState().profilePage.myLikes };
    profileAPI.saveProfile(userData.id, newData);
};


export default profileReducer;
