/** Actions */
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const OPEN_MESSAGE = 'OPEN_MESSAGE';

/** Action creaters */
export function loadMessages(position) {
    return {
        type: LOAD_MESSAGES,
        payload: {
            position: {
                lat: postition.lat,
                lng: position.lng
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
