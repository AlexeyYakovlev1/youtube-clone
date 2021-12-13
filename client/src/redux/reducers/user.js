const SET_USER = "SET_USER";
const LOGOUT_USER = "LOGOUT_USER";
const initialState = {
    info: {}, isAuth: false
}

export default function user(state = initialState, action) {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                info: action.payload,
                isAuth: true
            }
        case LOGOUT_USER:
            return {
                ...state,
                info: {},
                isAuth: false
            }
        default:
            return state;
    }
}