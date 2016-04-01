/** Actions */
export const LOGIN_BASIC = 'LOGIN_BASIC';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_FB = 'LOGIN_FB';
export const LOGIN_GMAIL = 'LOGIN_GMAIL';

/** Action creators */

export function basicLogin(user) {
    return {
        type: LOGIN_BASIC,
        payload: {
            user: user
        }
    }
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

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

export function loginFailure() {
    return {
        type: LOGIN_FAILURE
    }
}
