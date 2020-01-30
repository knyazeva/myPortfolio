import {profileAPI} from "../api/api";
import {cookie} from "../cookie/cookie";
import {stopSubmit} from "redux-form";
const SET_AUTH = "auth/SET_AUTH";

let initialState = {
    isAuth: false,
    authName: ""
};

const authReducer = (state = initialState, action) => {
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
export const setAuthAC = (isAuth, name, likes) => ({type: SET_AUTH, isAuth, name, likes});

// Thunk Creators
export const loginTC = (dataForm) => async (dispatch) => {  // логин -> при успехе создаем cookie, иначе выводим ошибку
    const response = await profileAPI.getMyProfile();
    if(response.data.login === dataForm.login && response.data.password === dataForm.password) {
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
