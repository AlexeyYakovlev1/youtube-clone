import propTypes from "prop-types";

export const setUser = (user) => {
    return {
        type: "SET_USER",
        payload: user
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