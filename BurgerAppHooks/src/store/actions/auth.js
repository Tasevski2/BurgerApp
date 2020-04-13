import * as actionTypes from './actionTypes';
import axios from 'axios';

const auth_start = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const auth_success = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: data.idToken,
            userId: data.localId
        }
    }
}

const auth_error = (err) => {
    return {
        type: actionTypes.AUTH_ERROR,
        payload: {
            error: err
        }
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const logout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
            window.location.reload();
        }, expirationTime *1000)
    }
}


export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(auth_start());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTljnCS_Bh0NSTz6nz9IPH8SnDbes0yho';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTljnCS_Bh0NSTz6nz9IPH8SnDbes0yho'
        }
        axios.post(url, authData)
            .then(res => {
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                const expiration = new Date(Date.now() + res.data.expiresIn * 1000);
                localStorage.setItem('expiration', expiration);
                dispatch(auth_success(res.data));
                dispatch(logout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(auth_error(err.response.data.error.message));
            })
    }
}

export const autoLogin = () => {
    return dispatch => {
        if (localStorage.getItem('token')) {
            let exp = new Date(localStorage.getItem('expiration'));
            exp = exp.getTime();
            if (exp > Date.now()) {
                dispatch(auth_success({
                    idToken: localStorage.getItem('token'),
                    localId: localStorage.getItem('userId')
                }));
                let leftTime = exp - Date.now();
                dispatch(logout(leftTime / 1000));
            } else {
                dispatch(authLogout());
            }
        } else {
            dispatch(authLogout());
        }
    }
}