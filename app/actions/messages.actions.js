/** Actions */
export const MESSAGES_LOAD = 'MESSAGES LOAD';
export const MESSAGES_LOAD_SUCCESS = 'MESSAGES LOAD SUCCESS';
export const MESSAGES_LOAD_FAILURE = 'MESSAGES LOAD FAILURE';
export const MESSAGES_USER_LOAD = 'MESSAGES USER LOAD';
export const MESSAGES_USER_LOAD_SUCCESS = 'MESSAGES USER LOAD SUCCESS';
export const MESSAGES_USER_LOAD_FAILURE = 'MESSAGES USER LOAD FAILURE';
export const MESSAGE_OPEN = 'MESSAGE OPEN';
export const MESSAGE_OPEN_SUCCESS = 'MESSAGE OPEN SUCCESS';
export const MESSAGE_OPEN_FAILURE = 'MESSAGE OPEN FAILURE';
export const MESSAGE_POST = 'MESSAGE POST';
export const MESSAGE_POST_SUCCESS = 'MESSAGE POST SUCCESS';
export const MESSAGE_POST_FAILURE = 'MESSAGE POST FAILURE';


/** Action creators */
export function loadMessages(position, token) {
    return {
        type: MESSAGES_LOAD,
        payload: {
            position,
            token: token
        }
    }
}

export function loadUserMessages(id, token) {
    return {
        type: MESSAGES_USER_LOAD,
        payload: {
            id,
            token
        }
    }
}

export function openMessage(msg, token) {
    return {
        type: MESSAGE_OPEN,
        payload: {
            id: msg._id,
            token: token
        }
    }
}

export function postMessage(data, token) {
    return {
        type: MESSAGE_POST,
        payload: {
            message: data,
            token: token
        }
    };
}

/** SUCCESS/FAILURE action creators */

export function openMessageSuccess(msg) {
    return {
        type: MESSAGE_OPEN_SUCCESS,
        payload: msg
    };
}


export function postMessageSuccess(data) {
    return {
        type: MESSAGE_POST_SUCCESS,
        payload: {
            new_message: data
        }
    };
}

export function success(data, action){
    return {
        type: action,
        payload: {
            messages: data
        }
    };
}

export function failure(error, action){
    return {
        type: action,
        payload: {
            error: error
        }
    };
}
