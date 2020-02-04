// @flow
import {checkCookieAuthTC} from "./authReducer";
import {ExtractReturn} from "../utils/extractReturn";
const INITIALIZE_SUCCESSFUL = 'app/INITIALIZE_SUCCESSFUL';
const SET_DATA_POPUP = 'app/SET_DATA_POPUP';


// Types Flow
type stateTypes = {
    isInitialize: boolean,
    dataPopUp: {
        isActive: boolean,
        title: string,
        body: string,
        isSuccessSend: boolean
    }
}
type actionTypes =
    ExtractReturn<typeof setDataPopupAC>;


// InitialState and Reducer
let initialState = {
    isInitialize: false,
    dataPopUp: {
        isActive: false,
        title: "",
        body: "",
        isSuccessSend: false
    }
};

const appReducer = (state: stateTypes = initialState, action: actionTypes): stateTypes => {
    switch (action.type) {
        case INITIALIZE_SUCCESSFUL:
            return {
                ...state,
                isInitialize: true
            };
        case SET_DATA_POPUP:
            return {
                ...state,
                dataPopUp: {
                    ...state.dataPopUp,
                    isActive: action.isActive,
                    title: action.title,
                    body: action.body,
                    isSuccessSend: action.isSuccessSend
                }
            };
        default:
            return state
    }
};


// Action Creators
export const initializeSuccessfulAC = () => ({type: INITIALIZE_SUCCESSFUL});
export const setDataPopupAC = (isActive: boolean, title: string, body: string, isSuccessSend: boolean = false) => ({type: SET_DATA_POPUP, isActive, title, body, isSuccessSend});


// Thunk Creators
export const initializeTC = () => async (dispatch) => {  // инициализация приложения (подгружаем страницы только после проверки cookie)
    await dispatch(checkCookieAuthTC());
    dispatch(initializeSuccessfulAC())
};


export default appReducer;

