import {communitiesAPI} from "../api/api";
import {communitiesType} from "../types/types";
const FOLLOW = "communities/FOLLOW";
const UNFOLLOW = "communities/UNFOLLOW";
const SET_DISABLE_FOLLOW = "communities/SET_DISABLE_FOLLOW";
const UPLOAD_COMMUNITIES = "communities/UPLOAD_COMMUNITIES";
const SET_COMMUNITY_PROFILE = "communities/SET_COMMUNITY_PROFILE";
const CLEAR = "communities/CLEAR";


let initialState = {
    communitiesProfile: null as communitiesType | null,
    communities: [] as Array<communitiesType> | null,
    isDisableFollow: [] as Array<number> | null
};

type initialStateType = typeof initialState;

const communitiesReducer = (state = initialState, action): initialStateType => {
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
                communitiesProfile: {...state.communitiesProfile, followed: true},
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
type setCommunityProfileACType = {
    type: typeof SET_COMMUNITY_PROFILE,
    profile: communitiesType
}
type followACType = {
    type: typeof FOLLOW,
    comId: number
}
type unFollowACType = {
    type: typeof UNFOLLOW,
    comId: number
}
type uploadCommunitiesACType = {
    type: typeof UPLOAD_COMMUNITIES,
    com: Array<communitiesType>
}
type setDisableFollowACType = {
    type: typeof SET_DISABLE_FOLLOW,
    isDisable: boolean,
    comId: number
}
type clearACType = {
    type: typeof CLEAR
}
export const setCommunityProfileAC = (profile: communitiesType): setCommunityProfileACType => ({type: SET_COMMUNITY_PROFILE, profile});
export const followAC = (comId: number): followACType => ({type: FOLLOW, comId});
export const unFollowAC = (comId: number): unFollowACType => ({type: UNFOLLOW, comId});
export const uploadCommunitiesAC = (com: Array<communitiesType>): uploadCommunitiesACType => ({type: UPLOAD_COMMUNITIES, com});
export const setDisableFollowAC = (isDisable: boolean, comId: number): setDisableFollowACType => ({type: SET_DISABLE_FOLLOW, isDisable, comId});
export const clearAC = (): clearACType => ({type: CLEAR});

// Thunk Creators
export const getCommunitiesTC = () => async (dispatch) => {  // получить все сообщества
    const response = await communitiesAPI.getCommunities();
    dispatch(uploadCommunitiesAC(response.data));
    dispatch(clearAC());
};
export const getCommunityProfileTC = (comId: number) => async (dispatch) => {  // получить все сообщества
    const response = await communitiesAPI.getCommunityProfile(comId);
    dispatch(setCommunityProfileAC(response.data));
};

export const unFollowTC = (comId: number, allInfoUser: communitiesType) => (dispatch) => {  // отписаться от сообщества
    console.log(allInfoUser);
    followUnfollow(dispatch, communitiesAPI.putUnFollow.bind(communitiesAPI), unFollowAC, comId, allInfoUser);
};
export const followTC = (comId: number, allInfoUser: communitiesType) => async (dispatch) => {  // подписаться на сообщество
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