/** Actions */
export const MESSAGES_LOAD = 'MESSAGES LOAD';
export const MESSAGES_LOAD_SUCCESS = 'MESSAGES LOAD SUCCESS';
export const MESSAGES_LOAD_FAILURE = 'MESSAGES LOAD FAILURE';
export const MESSAGE_OPEN = 'MESSAGE OPEN';
export const MESSAGE_OPEN_SUCCESS = 'MESSAGE OPEN SUCCESS';
export const MESSAGE_OPEN_FAILURE = 'MESSAGE OPEN FAILURE';
export const MESSAGE_POST = 'MESSAGE POST';
export const MESSAGE_POST_SUCCESS = 'MESSAGE POST SUCCESS';
export const MESSAGE_POST_FAILURE = 'MESSAGE POST FAILURE';

/** Action creators */
export function loadMessages(position, radius) {
    return {
        type: MESSAGES_LOAD,
        payload: {
            position,
            radius: radius
        }
    }
}

export function openMessage(msg) {
    return {
        type: MESSAGE_OPEN,
        payload: {
            id: msg._id
        }
    }
}

export function postMessage(data) {
    return {
        type: MESSAGE_POST,
        payload: {
            message: data
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
            messages: data,
            redirect: true
        }
    };
}

export function loadMessagesSuccess(data) {
    return {
        type: MESSAGES_LOAD_SUCCESS,
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
