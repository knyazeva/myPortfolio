import {checkCookieAuthTC} from "./authReducer";
const INITIALIZE_SUCCESSFUL = 'app/INITIALIZE_SUCCESSFUL';
const SET_DATA_POPUP = 'app/SET_DATA_POPUP';
import {dataPopUpType} from "../types/types"


let initialState = {
    isInitialize: false as boolean,
    dataPopUp: {
        isActive: false,
        title: "",
        body: "",
        isSuccessSend: false
    } as dataPopUpType
};

type initialStateType = typeof initialState;

const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case INITIALIZE_SUCCESSFUL:
            return {
                ...state,
                isInitialize: true
            };
        case SET_DATA_POPUP:
            return {
                ...state,
                dataPopUp: action.data,
            };
        default:
            return state
    }
};


// Action Creators
type initializeSuccessfulACType = {
    type: typeof INITIALIZE_SUCCESSFUL
}
type setDataPopupACType = {
    type: typeof SET_DATA_POPUP,
    data: dataPopUpType
}
export const initializeSuccessfulAC = (): initializeSuccessfulACType => ({type: INITIALIZE_SUCCESSFUL});
export const setDataPopupAC = (data: dataPopUpType): setDataPopupACType => ({type: SET_DATA_POPUP, data});

// Thunk Creators
export const initializeTC = () => async (dispatch) => {  // инициализация приложения (подгружаем страницы только после проверки cookie)
    await dispatch(checkCookieAuthTC());
    dispatch(initializeSuccessfulAC())
};


export default appReducer;

