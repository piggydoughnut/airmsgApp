import { LOAD_MESSAGES, MESSAGE_POST_SUCCESS, MESSAGE_POST_FAILURE, MESSAGES_LOAD_SUCCESS, MESSAGES_LOAD_FAILURE, MESSAGE_OPEN_SUCCESS } from '../actions/messages.actions'

// initial state for messages is an empty array
const messages = (state = [], action) => {
    switch (action.type) {
        case MESSAGE_OPEN_SUCCESS: {
            return{
                messages: state.messages,
                messageDetail: action.payload,
            };
        }
        case MESSAGE_POST_SUCCESS:
            state.messages.docs.push(action.payload.new_message);
            return {
                messages: {
                    docs: state.messages.docs,
                    total: state.messages.total,
                    limit: state.messages.limit,
                    offset: state.messages.offset
                }
            };
        case MESSAGE_POST_FAILURE:
            return action.payload;
        case MESSAGES_LOAD_SUCCESS:
            return action.payload;
        case MESSAGES_LOAD_FAILURE:
            return action.payload;
        default:
            return {
                messages: state.messages
            };
    }
};

export default messages;
