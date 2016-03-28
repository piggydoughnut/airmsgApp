import {LOGIN_BASIC, LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_FB, LOGIN_GMAIL} from '../actions/login.actions.js'
import Immutable from 'immutable';


// initial state for login is empty user details
const login = (state = [], action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                payload: action.payload,
                loggedIn: true
            };
        default:
            return {
                redirect: null,
                loggedIn: false,
                payload: {}
            };
    }
};

export default login;
