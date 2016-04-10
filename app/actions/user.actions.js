/** Actions */
export const USER_LOAD = 'USER LOAD';
export const USER_LOAD_SUCCESS = 'USER LOAD SUCCESS';
export const USER_LOAD_FAILURE = 'USER LOAD FAILURE';

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
