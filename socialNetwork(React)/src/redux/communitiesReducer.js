import {communitiesAPI} from "../api/api";
const FOLLOW = "communities/FOLLOW";
const UNFOLLOW = "communities/UNFOLLOW";
const SET_DISABLE_FOLLOW = "communities/SET_DISABLE_FOLLOW";
const UPLOAD_COMMUNITIES = "communities/UPLOAD_COMMUNITIES";
const SET_COMMUNITY_PROFILE = "communities/SET_COMMUNITY_PROFILE";
const CLEAR = "communities/CLEAR";


let initialState = {
    communitiesProfile: null,
    communities: [],
    isDisableFollow: []
};

const communitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMMUNITY_PROFILE:
            return {
                ...state,
                communitiesProfile: action.profile
            };
        case FOLLOW:  // подписаться на сообщество
            return {
                ...state,
                communities: state.communities.map(com => { return com.id === action.comId ? {...com, followed: true} : com }),
                communitiesProfile: {...state.communitiesProfile, followed: true}
            };
        case UNFOLLOW:  // отписаться от сообщества
            return {
                ...state,
                communities: state.communities.map(com => { return com.id === action.comId ? {...com, followed: false} : com }),
                communitiesProfile: {...state.communitiesProfile, followed: false}
            };
        case UPLOAD_COMMUNITIES:  // загрузить сообщества
            return {
                ...state,
                communities: action.com,
            };
        case CLEAR:
            return {
                ...state,
                communitiesProfile: null
            };
        case SET_DISABLE_FOLLOW:  // установить кнопку неактивной, пока идет запрос/ответ от сервера
            return {
                ...state,
                isDisableFollow: action.isDisable
                    ? [...state.isDisableFollow, action.comId]
                    : state.isDisableFollow.filter(id => id !== action.comId)
            };
        default:
            return state;
    }
};


// Action Creators
export const setCommunityProfileAC = (profile) => ({type: SET_COMMUNITY_PROFILE, profile});
export const followAC = (comId) => ({type: FOLLOW, comId});
export const unFollowAC = (comId) => ({type: UNFOLLOW, comId});
export const uploadCommunitiesAC = (com) => ({type: UPLOAD_COMMUNITIES, com});
export const setDisableFollowAC = (isDisable, comId) => ({type: SET_DISABLE_FOLLOW, isDisable, comId});
export const clearAC = () => ({type: CLEAR});

// Thunk Creators
export const getCommunitiesTC = () => async (dispatch) => {  // получить все сообщества
    const response = await communitiesAPI.getCommunities();
    dispatch(uploadCommunitiesAC(response.data));
    dispatch(clearAC());
};
export const getCommunityProfileTC = (comId) => async (dispatch) => {  // получить все сообщества
    const response = await communitiesAPI.getCommunityProfile(comId);
    dispatch(setCommunityProfileAC(response.data));
};
export const unFollowTC = (comId, allInfoUser) => (dispatch) => {  // отписаться от сообщества
    followUnfollow(dispatch, communitiesAPI.putUnFollow.bind(communitiesAPI), unFollowAC, comId, allInfoUser);
};
export const followTC = (comId, allInfoUser) => async (dispatch) => {  // подписаться на сообщество
    followUnfollow(dispatch, communitiesAPI.putFollow.bind(communitiesAPI), followAC, comId, allInfoUser);
};

// Common Functions
const followUnfollow = async (dispatch, apiMethod, actionCreator, comId, allInfoUser) => {  // общая функция для подписки и отписки
    dispatch(setDisableFollowAC(true, comId));
    await apiMethod(comId, allInfoUser);
    dispatch(setDisableFollowAC(false, comId));
    dispatch(actionCreator(comId));
};


export default communitiesReducer;