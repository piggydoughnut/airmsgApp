import {LOGIN_SUCCESS, LOGIN_FAILURE, SET_TOKEN} from "../actions/auth.actions.js";
import {
    MESSAGES_USER_LOAD_SUCCESS,
    MESSAGES_USER_LOAD_FAILURE,
    MESSAGE_OPEN_PERSONAL_SUCCESS,
    MESSAGE_OPEN_PERSONAL_FAILURE,
    MESSAGES_LOAD_SUCCESS,
    MESSAGE_CLOSE_PERSONAL
} from "../actions/messages.actions.js";

// initial state for login is empty user details
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
            console.log(state.messages === undefined);
            console.log(state.messages === []);
            console.log(action.payload.messages.offset === 0);
            if (state.messages === undefined || state.messages === [] || action.payload.messages.offset === 0) {
                messagesDocs = action.payload.messages.docs;
            } else {
                action.payload.messages.docs.forEach(function (val) {
                    state.messages.docs.push(val);
                });
                messagesDocs = state.messages.docs;
            }
            console.log(messagesDocs);
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
        default:
            return state;
    }
};

export default user;
