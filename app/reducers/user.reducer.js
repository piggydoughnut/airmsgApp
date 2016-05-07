import {REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, EDIT_USER_SUCCESS, EDIT_USER_FAILURE} from "../actions/user.actions";
import {LOGIN_SUCCESS, LOGIN_FAILURE, SET_TOKEN, LOGOUT} from "../actions/auth.actions.js";
import {
    MESSAGES_USER_LOAD_SUCCESS,
    MESSAGES_USER_LOAD_FAILURE,
    MESSAGE_OPEN_PERSONAL_SUCCESS,
    MESSAGE_OPEN_PERSONAL_FAILURE,
    MESSAGES_LOAD_SUCCESS,
    MESSAGE_CLOSE_PERSONAL
} from "../actions/messages.actions.js";
import {COMMENT_POST_SUCCESS} from "../actions/comments.actions";

const user = (state = [], action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                tokenInfo: action.payload
            };
        case LOGIN_FAILURE:
            return {
                error: action.payload.error
            };
        case LOGIN_SUCCESS:
            return {
                tokenInfo: state.tokenInfo,
                user: action.payload
            };
        case MESSAGES_LOAD_SUCCESS:
            return {
                tokenInfo: state.tokenInfo,
                user: state.user
            };
        case MESSAGES_USER_LOAD_SUCCESS:
            var messagesDocs = [];
            if (state.messages === undefined || state.messages === [] || action.payload.messages.offset === 0) {
                messagesDocs = action.payload.messages.docs;
            } else {
                action.payload.messages.docs.forEach(function (val) {
                    state.messages.docs.push(val);
                });
                messagesDocs = state.messages.docs;
            }
            return {
                tokenInfo: state.tokenInfo,
                user: state.user,
                messages: {
                    docs: messagesDocs,
                    total: action.payload.messages.total,
                    offset: action.payload.messages.offset,
                    limit: action.payload.messages.limit

                }
            };
        case MESSAGES_USER_LOAD_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        case MESSAGE_OPEN_PERSONAL_SUCCESS:
            return {
                ...state,
                messageDetail: action.payload
            };
        case MESSAGE_OPEN_PERSONAL_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        case MESSAGE_CLOSE_PERSONAL:
            return {
                user: state.user,
                tokenInfo: state.tokenInfo
            };
        case COMMENT_POST_SUCCESS:
            if (state.messageDetail === undefined) {
                return state;
            }
            state.messageDetail.comments.docs.push(action.payload.new_comment);
            return {
                tokenInfo: state.tokenInfo,
                user: state.user,
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
        case REGISTER_USER_FAILURE:
            return {
                register: {
                    error: action.payload.error.errors
                }
            };
        case REGISTER_USER_SUCCESS:
            return {
                user: action.payload.user
            };
        case EDIT_USER_SUCCESS:
            return {
                user: action.payload,
                tokenInfo: state.tokenInfo
            };
        case EDIT_USER_FAILURE:
            return state;
        case LOGOUT:
            return {};
        default:
            return state;
    }
};

export default user;
