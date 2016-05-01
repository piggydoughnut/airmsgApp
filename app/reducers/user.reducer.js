import {LOGIN_SUCCESS, LOGIN_FAILURE, SET_TOKEN } from '../actions/auth.actions.js'

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
        default:
            return state;
    }
};

export default user;
