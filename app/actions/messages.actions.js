/** Actions */
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const OPEN_MESSAGE = 'OPEN_MESSAGE';
export const MESSAGE_POST = 'MESSAGE POST';
export const MESSAGE_POST_SUCCESS = 'MESSAGE POST SUCCESS';
export const MESSAGE_POST_FAILURE = 'MESSAGE POST FAILURE';

/** Action creaters */
export function loadMessages(position) {
    return {
        type: LOAD_MESSAGES,
        payload: {
            position: {
                lat: postition.latitude,
                lng: position.longitude
            },
            radius: 5
        }
    }
}

export function openMessage(id, position) {
    return {
        type: OPEN_MESSAGE,
        payload: {
            position: {
                lat: postition.lat,
                lng: position.lng
            },
            msg_id: id
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

export function postMessageSuccess() {
    return {
        type: MESSAGE_POST_SUCCESS
    };
}

export function postMessageFailure() {
    return {
        type: MESSAGE_POST_FAILURE
    };

}
