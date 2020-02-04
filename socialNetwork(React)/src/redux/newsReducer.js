const GET_NEWS = "news/GET_NEWS";
const SET_NEWS = "news/SET_NEWS";
const CLEAR_NEWS = "news/CLEAR_NEWS";
const SET_RANGE_NEWS = "news/SET_RANGE_NEWS";
const ADD_LIKE = "news/ADD_LIKE";
const DELETE_LIKE = "news/DELETE_LIKE";
import {newsAPI} from "../api/api";

let initialState = {
    news: [],
    numberAllNews: 0,
    startPortionNews: 0,
    endPortionNews: 5,
    stepPortionNews: 5
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NEWS:  // получить все новости
            return {
                ...state,
                numberAllNews: action.news
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
                startPortionNews: 0,
                endPortionNews: 5,
                numberAllNews: 0
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
export const getNewsAC = (news) => ({type: GET_NEWS, news});
export const setNewsAC = (news) => ({type: SET_NEWS, news});
export const clearNewsAC = () => ({type: CLEAR_NEWS});
export const setRangeNewsAC = () => ({type: SET_RANGE_NEWS});
export const addLikeAC = (newsId) => ({type: ADD_LIKE, newsId});
export const deleteLikeAC = (newsId) => ({type: DELETE_LIKE, newsId});

// Thunk Creators
export const setPortionNewsTC = (startPortion, endPortion, profileName) => async (dispatch, getState) => {  // установить необходимую порцию новостей
    profileName ? profileName = `title=${profileName}` : profileName = "";

    const responseAllNews = await newsAPI.getNews(profileName);
    dispatch(getNewsAC(responseAllNews.data.length));

    const responsePortionNews = await newsAPI.getPortionNews(startPortion, endPortion, profileName);
    dispatch(setNewsAC(responsePortionNews.data));

    window.addEventListener('scroll', function() {  // при прокрутке до конца страницы - позгружаем еще новости, если они есть.
        let documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight - 100;
        if(pageYOffset >= documentHeight && getState().newsPage.numberAllNews > getState().newsPage.endPortionNews) {
            dispatch(setRangeNewsAC());
            dispatch(setPortionNewsTC(getState().newsPage.startPortionNews, getState().newsPage.endPortionNews));
        }
    });
};
export const addLikeTC = (allDataAboutItem, numLike) => (dispatch) => {  // добавить лайк
    dispatch(addLikeAC(allDataAboutItem.id));
    newsAPI.putLike(allDataAboutItem.id, {...allDataAboutItem, likes: numLike, myLikes: true})
};
export const deleteLikeTC = (allDataAboutItem, numLike) => (dispatch) => {  // удалить лайк
    dispatch(deleteLikeAC(allDataAboutItem.id));
    newsAPI.putLike(allDataAboutItem.id, {...allDataAboutItem, likes: numLike, myLikes: false})
};


export default newsReducer;