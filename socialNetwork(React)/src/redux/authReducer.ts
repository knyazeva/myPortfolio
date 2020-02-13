import {profileAPI} from "../api/api";
import {cookie} from "../cookie/cookie";
import {stopSubmit} from "redux-form";
const SET_AUTH = "auth/SET_AUTH";

let initialState = {
    isAuth: false as boolean,
    authName: "" as string
};

type initialStateType = typeof initialState;

const authReducer = (state = initialState, action): initialStateType => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.isAuth,
                authName: action.name
            };
        default:
            return state
    }
};


// Action Creators
type setAuthACType = {
    type: typeof SET_AUTH,
    isAuth: boolean,
    name: string
}
export const setAuthAC = (isAuth: boolean, name: string): setAuthACType => ({type: SET_AUTH, isAuth, name});

// Thunk Creators
export const loginTC = (login: string, password: string) => async (dispatch) => {  // логин -> при успехе создаем cookie, иначе выводим ошибку
    const response = await profileAPI.getMyProfile();
    if(response.data.login === login && response.data.password === password) {
        cookie.set("loginName", response.data.login, 365);
        dispatch(setAuthAC(true, response.data.login));
    } else {
        dispatch(stopSubmit("login", {_error: "Data entered is not correct."}));
    }
};
export const logoutTC = () => (dispatch) => {  // логаут -> удаляем cookie
    cookie.delete("loginName");
    dispatch(setAuthAC(false, "Login"))
};
export const checkCookieAuthTC = () => async (dispatch) => {  // проверка cookie -> если cookie есть, то меняем статус приложения на "авторизован"
    let name = cookie.get("loginName");
    if(name) {return dispatch(setAuthAC(true, name))}
};



export default authReducer;
