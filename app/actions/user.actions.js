/** Actions */
export const USER_LOAD = 'USER LOAD';
export const USER_LOAD_SUCCESS = 'USER LOAD SUCCESS';
export const USER_LOAD_FAILURE = 'USER LOAD FAILURE';
export const REGISTER_USER = 'REGISTER USER';
export const REGISTER_USER_SUCCESS = 'REGISTER USER SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER USER FAILURE';
export const EDIT_USER = 'EDIT USER';
export const EDIT_USER_SUCCESS = 'EDIT USER SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT USER FAILURE';

/** Action creators */

export function userLoad(userId) {
    return {
        type: USER_LOAD,
        payload: {
            user_id: userId
        }
    }
}

export function userLoadSuccess(user) {
    return {
        type: USER_LOAD_SUCCESS,
        payload: user
    }
}

export function userLoadFailure(error) {
    return {
        type: USER_LOAD_FAILURE,
        payload: error
    }
}

export function registerUser(info) {
    return {
        type: REGISTER_USER,
        payload: info
    }
}

export function editUser(user, token) {
    return {
        type: EDIT_USER,
        payload: {
            user,
            token
        }
    }
}
