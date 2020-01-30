import {checkCookieAuthTC} from "./authReducer";
const INITIALIZE_SUCCESSFUL = 'app/INITIALIZE_SUCCESSFUL';

let initialState = {
    isInitialize: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_SUCCESSFUL:
            return {
                ...state,
                isInitialize: true
            };
        default:
            return state
    }
};


// Action Creators
export const initializeSuccessfulAC = () => ({type: INITIALIZE_SUCCESSFUL});

// Thunk Creators
export const initializeTC = () => async (dispatch) => {  // инициализация приложения (подгружаем страницы только после проверки cookie)
    await dispatch(checkCookieAuthTC());
    dispatch(initializeSuccessfulAC())
};


export default appReducer;

