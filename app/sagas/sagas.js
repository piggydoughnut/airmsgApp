import { takeEvery, takeLatest } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects'
import { LOGIN_BASIC, LOGIN_FB, LOGIN_GMAIL } from '../actions/login.actions'
import { MESSAGE_POST } from '../actions/messages.actions'

var messagesApi = require('../api/messages.api');
var messageActions = require('../actions/messages.actions');
var loginActions = require('../actions/login.actions');
var Api = require('../config/api');

/** workers */
function* loginApi(user) {
    yield put(loginActions.loginSuccess());
}

function* postMessage(data) {
    try {
        const response = yield call(messagesApi.postMessage, data.payload.message);
        console.log(response);
        yield put(messageActions.postMessageFailure());
    } catch (error) {
        yield put(messageActions.postMessageFailure());
    }
}

/** watchers */
export function* watchLogin() {
    yield* takeEvery(LOGIN_BASIC, loginApi);
}

export function* watchMessagePost() {
    yield* takeEvery(MESSAGE_POST, postMessage);
}