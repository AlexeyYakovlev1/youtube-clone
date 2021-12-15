import {logoutUser, setUser} from "../redux/actions/index";
import propTypes from "prop-types";

export const register = async(user, setMessage) => {
    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })

        response.json().then(data => {
            if (response.ok) {
                setMessage({
                    text: data.message,
                    type: "success"
                })
            } else {
                setMessage({
                    text: data.message,
                    type: "error"
                })
            }
        })
    } catch(e) {
        console.log(e);
        setMessage({
            text: e.message,
            type: "error"
        })
    }
}

export const login = (user, setMessage) => {
    return async(dispatch) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            response.json().then(data => {
                if (!response.ok) {
                    return setMessage({
                        text: data.message,
                        type: "error"
                    })
                }
                dispatch(setUser(data.infoUser, data.token));
                localStorage.setItem("token", data.token);
            })
        } catch(e) {
            console.log(e);
            setMessage({
                text: e.message,
                type: "error"
            })
        }
    }
}

export const auth = () => {
    return async(dispatch) => {
        try {
            const response = await fetch("/api/auth/auth", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            
            response.json().then(data => {
                if (data.message) {
                    return dispatch(logoutUser());
                }

                dispatch(setUser(data.infoUser, data.token));
                localStorage.setItem("token", data.token);
            })
        } catch(e) {
            dispatch(logoutUser());
            localStorage.removeItem("token");
        }
    }
}

register.propTypes = {
    user: propTypes.object.isRequired,
    setMessage: propTypes.func.isRequired
}

login.propTypes = {
    user: propTypes.object.isRequired,
    setMessage: propTypes.func.isRequired
}