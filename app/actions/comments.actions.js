/** Actions */
export const COMMENT_POST = 'COMMENT POST';
export const COMMENT_POST_SUCCESS = 'COMMENT POST SUCCESS';
export const COMMENT_POST_FAILURE = 'COMMENT POST FAILURE';
export const COMMENTS_LOAD = 'COMMENTS LOAD';
export const COMMENTS_LOAD_SUCCESS = 'COMMENTS LOAD SUCCESS';
export const COMMENTS_LOAD_FAILURE = 'COMMENTS LOAD FAILURE';

/** Action creators */
export function getComments(id, token, page) {
    return {
        type: COMMENTS_LOAD,
        payload: id, token, page
    }
}

export function post(data, token, action) {
    return {
        type: action,
        payload: {
            comment: data,
            token: token
        }
    };
}

/** SUCCESS/FAILURE action creators */
export function success(data, action) {
    return {
        type: action,
        payload: data

    };
}

export function failure(error, action) {
    return {
        type: action,
        payload: {
            error: error
        }
    };
}
