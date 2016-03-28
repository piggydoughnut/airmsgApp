//import { CALL_API } from 'redux-api-middleware';

/** Actions */
export const LOGIN_BASIC = 'LOGIN_BASIC';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_FB = 'LOGIN_FB';
export const LOGIN_GMAIL = 'LOGIN_GMAIL';

/** Action creaters */

/** @todo implement login */
export function basicLogin(userData) {
    return dispatch =>
        //fetch('http://localhost/login', {
        //    method: 'post',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json'
        //    },
        //    body: JSON.stringify({
        //        email: userData.email,
        //        password: userData.password
        //    })
        //})
        //    .then(response => {
        //        if (response.status >= 200 && response.status < 300) {
        //            console.log(response);
        //            dispatch(loginSuccess(response));
        //        } else {
        //            const error = new Error(response.statusText);
        //            error.response = response;
        //            dispatch(loginError(error));
        //            throw error;
        //        }
        //    })
        //    .catch(error => { console.log('request failed', error); });
        dispatch(loginSuccess(userData));
}

export function loginFacebook(user) {
    return {
        type: LOGIN_FB,
        payload: {
            user: user
        }
    }
}

export function loginGmail(user) {
    return {
        type: LOGIN_GMAIL,
        payload: {
            user: user
        }
    }
}

export function loginError(error) {
    return {
        type: LOGIN_FAILURE,
        payload: {},
        error: error
    }
}

export function loginSuccess(response) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user_id: "56ebe2c5871fc6eb9cd08bcc"
        }
    }
}
