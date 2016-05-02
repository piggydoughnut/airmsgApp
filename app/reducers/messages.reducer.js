import {
    MESSAGE_POST_SUCCESS,
    MESSAGE_POST_FAILURE,
    MESSAGE_OPEN_FAILURE,
    MESSAGES_LOAD_SUCCESS,
    MESSAGES_LOAD_FAILURE,
    MESSAGE_OPEN_SUCCESS,
    MESSAGES_USER_LOAD_SUCCESS,
    MESSAGES_USER_LOAD_FAILURE,
    MESSAGE_CLOSE
} from "../actions/messages.actions";
import {
    COMMENT_POST_SUCCESS
} from "../actions/comments.actions";

// initial state for messages is an empty array
const messages = (state = [], action) => {
    switch (action.type) {
        case MESSAGE_OPEN_FAILURE:
            return {
                messages: state.messages,
                error: action.payload.error
            };
        case MESSAGE_OPEN_SUCCESS:
            return {
                messages: state.messages,
                messageDetail: action.payload
            };
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
        case COMMENT_POST_SUCCESS:
            console.log(state.messageDetail);
            state.messageDetail.comments.docs.push(action.payload.new_comment);
            return {
                messages: state.messages,
                messageDetail: {
                    message: state.messageDetail.message,
                    comments: {
                        docs: state.messageDetail.comments.docs,
                        total: state.messageDetail.comments.total,
                        limit: state.messageDetail.comments.limit,
                        offset: state.messageDetail.comments.offset
                    }
                }
            };
        case MESSAGE_CLOSE:
            return {
                messages: state.messages
            };
        default:
            return state;
    }
};

export default messages;
