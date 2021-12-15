const SET_USER = "SET_USER";
const LOGOUT_USER = "LOGOUT_USER";
const SET_VIDEOS = "SET_VIDEOS";

const initialState = {
    info: {}, isAuth: false, videos: [],
    token: ""
}

export default function user(state = initialState, action) {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                info: action.payload,
                isAuth: true,
                token: action.token
            }
        case LOGOUT_USER:
            return {
                ...state,
                info: {},
                isAuth: false,
                token: ""
            }
        case SET_VIDEOS:
            return {
                ...state,
                videos: [action.payload]
            }
        default:
            return state;
    }
}