import { takeEvery, takeLatest } from 'redux-saga'
import { take, put, call, fork, select } from 'redux-saga/effects'
import {LOGIN_BASIC, LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_FB, LOGIN_GMAIL} from '../actions/login.actions'

export function* loginApi(user) {
    yield put({
        type: LOGIN_SUCCESS,
        payload: {
            user: user
        }
    });
}

export function* watchLogin() {
    //yield* takeEvery(LOGIN_BASIC, loginApi);
    while(true){
        yield take(LOGIN_BASIC);
        yield put({
            type: LOGIN_SUCCESS,
            payload: {
                user: ''
            }
        });
    }
}
