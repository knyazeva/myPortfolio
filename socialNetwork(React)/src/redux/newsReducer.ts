const GET_NEWS = "news/GET_NEWS";
const SET_NEWS = "news/SET_NEWS";
const CLEAR_NEWS = "news/CLEAR_NEWS";
const SET_RANGE_NEWS = "news/SET_RANGE_NEWS";
const ADD_LIKE = "news/ADD_LIKE";
const DELETE_LIKE = "news/DELETE_LIKE";
import {newsAPI} from "../api/api";
import { newsType, communitiesType } from "../types/types";


let initialState = {
    news: [] as Array<newsType>,
    numberAllNews: 0 as number,
    startPortionNews: 0 as number,
    endPortionNews: 5 as number,
    stepPortionNews: 5 as number
};

type initialStateType = typeof initialState;

const newsReducer = (state = initialState, action): initialStateType => {
    switch (action.type) {
        case GET_NEWS:  // получить все новости
            return {
                ...state,
                numberAllNews: action.numberAllNews
            };
        case SET_NEWS:  // установить новости
            return {
                ...state,
                news: [...state.news, ...action.news],
            };
        case SET_RANGE_NEWS:  // задать диапазон отображаемых новостей
            return {
                ...state,
                startPortionNews: state.startPortionNews + state.stepPortionNews,
                endPortionNews: state.endPortionNews + state.stepPortionNews
            };
        case CLEAR_NEWS:  // очистить все новости
            return {
                ...state,
                news: [],
                numberAllNews: 0,
                startPortionNews: 0,
                endPortionNews: 5
            };
        case ADD_LIKE:  // добавить лайк
            return {
                ...state,
                news: state.news.map((news) => {return news.id === action.newsId ? {...news, myLikes: true} : news})
            };
        case DELETE_LIKE:  // удалить лайк
            return {
                ...state,
                news: state.news.map((news) => {return news.id === action.newsId ? {...news, myLikes: false} : news})
            };
        default:
            return state;
    }
};


// Action Creators
type getNewsACType = {
    type: typeof GET_NEWS,
    numberAllNews: number
}
type setNewsACType = {
    type: typeof SET_NEWS,
    news: Array<newsType>
}
type clearNewsACType = {
    type: typeof CLEAR_NEWS
}
type setRangeNewsACType = {
    type: typeof SET_RANGE_NEWS
}
type addLikeACType = {
    type: typeof ADD_LIKE,
    newsId: number
}
type deleteLikeACType = {
    type: typeof DELETE_LIKE,
    newsId: number
}
export const getNewsAC = (numberAllNews: number): getNewsACType => ({type: GET_NEWS, numberAllNews});
export const setNewsAC = (news: Array<newsType>): setNewsACType => ({type: SET_NEWS, news});
export const clearNewsAC = (): clearNewsACType => ({type: CLEAR_NEWS});
export const setRangeNewsAC = (): setRangeNewsACType => ({type: SET_RANGE_NEWS});
export const addLikeAC = (newsId: number): addLikeACType => ({type: ADD_LIKE, newsId});
export const deleteLikeAC = (newsId: number): deleteLikeACType => ({type: DELETE_LIKE, newsId});

// Thunk Creators
export const setPortionNewsTC = (startPortion: number, endPortion: number, profileName: string) => async (dispatch, getState) => {  // установить необходимую порцию новостей
    profileName ? profileName = `title=${profileName}` : profileName = "";

    const responseAllNews = await newsAPI.getNews(profileName);
    dispatch(getNewsAC(responseAllNews.data.length));

    const responsePortionNews = await newsAPI.getPortionNews(startPortion, endPortion, profileName);
    dispatch(setNewsAC(responsePortionNews.data));

    window.addEventListener('scroll', function() {  // при прокрутке до конца страницы - позгружаем еще новости, если они есть.
        let documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight - 100;
        if(pageYOffset >= documentHeight && getState().newsPage.numberAllNews > getState().newsPage.endPortionNews) {
            dispatch(setRangeNewsAC());
            dispatch(setPortionNewsTC(getState().newsPage.startPortionNews, getState().newsPage.endPortionNews, null));
        }
    });
};
export const addLikeTC = (allDataAboutItem, numLike: number) => (dispatch) => {  // добавить лайк
    dispatch(addLikeAC(allDataAboutItem.id));
    newsAPI.putLike(allDataAboutItem.id, {...allDataAboutItem, likes: numLike, myLikes: true})
};
export const deleteLikeTC = (allDataAboutItem, numLike: number) => (dispatch) => {  // удалить лайк
    dispatch(deleteLikeAC(allDataAboutItem.id));
    newsAPI.putLike(allDataAboutItem.id, {...allDataAboutItem, likes: numLike, myLikes: false})
};


export default newsReducer;