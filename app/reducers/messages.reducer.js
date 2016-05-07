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
    COMMENT_POST_SUCCESS,
    COMMENTS_LOAD_SUCCESS,
    COMMENTS_LOAD_FAILURE
} from "../actions/comments.actions";
import {
    LOGOUT
} from "../actions/auth.actions";

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
            if(state.messageDetail === undefined){
                return state;
            }
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
        case COMMENTS_LOAD_SUCCESS:
            var commentsDocs = [];
            if (state.messageDetail === undefined || state.messageDetail === [] || action.payload.comments.offset === 0) {
                commentsDocs = action.payload.comments.docs;
            } else {
                action.payload.comments.docs.forEach(function (val) {
                    console.log('push');
                    state.messageDetail.comments.docs.push(val);
                });
                commentsDocs = state.messageDetail.comments.docs;
            }
            return {
                messages: state.messages,
                messageDetail: {
                    comments: {
                        docs: commentsDocs,
                        total: action.payload.comments.total,
                        offset: action.payload.comments.offset,
                        limit: action.payload.comments.limit
                    },
                    message: state.messageDetail.message

                }
            };

        case LOGOUT:
            return [];
        default:
            return state;
    }
};

export default messages;
