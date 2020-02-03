import {checkCookieAuthTC} from "./authReducer";
const INITIALIZE_SUCCESSFUL = 'app/INITIALIZE_SUCCESSFUL';
const SET_DATA_POPUP = 'app/SET_DATA_POPUP';

let initialState = {
    isInitialize: false,
    dataPopUp: {
        isActive: false,
        title: "",
        body: "",
        isSuccessSend: false
    }
};

const appReducer = (state = initialState, action) => {
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
export const initializeSuccessfulAC = () => ({type: INITIALIZE_SUCCESSFUL});
export const setDataPopupAC = (data) => ({type: SET_DATA_POPUP, data});

// Thunk Creators
export const initializeTC = () => async (dispatch) => {  // инициализация приложения (подгружаем страницы только после проверки cookie)
    await dispatch(checkCookieAuthTC());
    dispatch(initializeSuccessfulAC())
};


export default appReducer;

