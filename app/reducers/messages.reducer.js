import { LOAD_MESSAGES, MESSAGE_POST_SUCCESS, MESSAGE_POST_FAILURE } from '../actions/messages.actions'

// initial state for messages is an empty array
const messages = (state = [], action) => {
    switch (action.type) {
        case MESSAGE_POST_SUCCESS:
            return {
                error: false,
                payload: action.payload
            };
        case MESSAGE_POST_FAILURE:
            return {
                error: action.error,
                payload: action.payload
            };
        default:
            return state;
    }
};

export default messages;
