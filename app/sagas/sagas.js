import { takeEvery, takeLatest } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects'
import { LOGIN_BASIC, LOGIN_FB, LOGIN_GMAIL } from '../actions/login.actions'
import { MESSAGE_POST, MESSAGES_LOAD } from '../actions/messages.actions'

var messagesApi = require('../api/messages.api');
var messageActions = require('../actions/messages.actions');
var loginActions = require('../actions/login.actions');
var Api = require('../config/api');

/** workers */
function* loginApi(action) {
    yield put(loginActions.loginSuccess(action.payload.user));
}

function* postMessage(data) {
    try {
        const response = yield call(messagesApi.postMessage, data.payload.message);
        console.log(response);
        yield put(messageActions.postMessageSuccess(response));
    } catch (error) {
        yield put(messageActions.postMessageFailure(error));
    }
}

function* loadMessages(data){
    try{
        const response = yield call(messagesApi.loadMessages, data.payload);
        yield put(messageActions.loadMessagesSuccess(response));
    }catch(error){
        yield put(messageActions.loadMessagesFailure(error));
    }
}

/** watchers */
export function* watchLogin() {
    yield* takeEvery(LOGIN_BASIC, loginApi);
}

export function* watchMessagesLoad() {
    yield* takeEvery(MESSAGES_LOAD, loadMessages);
}

export function* watchMessagePost() {
    yield* takeEvery(MESSAGE_POST, postMessage);
}