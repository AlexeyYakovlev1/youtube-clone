import propTypes from "prop-types";

export const setUser = (user, token) => {
    return {
        type: "SET_USER",
        payload: user,
        token
    }
}

export const logoutUser = () => {
    return {
        type: "LOGOUT_USER"
    }
}

export const setVideos = (video) => {
    return {
        type: "SET_VIDEOS",
        payload: video
    }
}

setUser.propTypes = {
    user: propTypes.object.isRequired
}

setVideos.propTypes = {
    video: propTypes.object.isRequired
}