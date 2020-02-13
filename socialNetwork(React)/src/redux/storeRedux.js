import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import newsReducer from "./newsReducer";
import communitiesReducer from "./communitiesReducer";

const reducers = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    newsPage: newsReducer,
    communitiesPage: communitiesReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer

});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // настройка для расширения chrome 'Redux DevTools'
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

window.store = store;

export default store;