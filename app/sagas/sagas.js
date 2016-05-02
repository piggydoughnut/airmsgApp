import {takeEvery, takeLatest} from "redux-saga";
import {take, put, call, fork, select} from "redux-saga/effects";
import {LOGIN_BASIC, LOGIN_FAILURE} from "../actions/auth.actions";
import {
    MESSAGE_POST,
    MESSAGE_POST_FAILURE,
    MESSAGE_OPEN,
    MESSAGE_OPEN_FAILURE,
    MESSAGE_OPEN_PERSONAL,
    MESSAGE_OPEN_PERSONAL_SUCCESS,
    MESSAGE_OPEN_PERSONAL_FAILURE,
    MESSAGES_LOAD,
    MESSAGES_LOAD_SUCCESS,
    MESSAGES_LOAD_FAILURE,
    MESSAGES_USER_LOAD,
    MESSAGES_USER_LOAD_SUCCESS,
    MESSAGES_USER_LOAD_FAILURE
} from "../actions/messages.actions";
import {
    COMMENT_POST,
    COMMENT_POST_SUCCESS,
    COMMENT_POST_FAILURE,
    COMMENTS_LOAD_SUCCESS,
    COMMENTS_LOAD_FAILURE,
    COMMENTS_LOAD
} from "../actions/comments.actions";
import {GET_GALLERY_USER, GET_GALLERY_USER_SUCCESS, GET_GALLERY_USER_FAILURE} from "../actions/gallery.actions";
import {checkResponseStatus} from "../api/default.api";

var messagesApi = require('../api/messages.api');
var galleryApi = require('../api/gallery.api');
var usersApi = require('../api/users.api');

var messageActions = require('../actions/messages.actions');
var commentActions = require('../actions/comments.actions');
var authActions = require('../actions/auth.actions');
var commonActions = require('../actions/common.actions');
var Api = require('../config/api');

/** workers */
function* auth(action) {
    try {
        const response = yield call(usersApi.getAccess, action.payload);
        checkResponseStatus(response);
        yield put(authActions.setToken(response));

        const user = yield call(usersApi.getUserInfo, response.access_token);
        checkResponseStatus(user);
        yield put(authActions.loginSuccess(user));
    } catch (error) {
        yield put(commonActions.failure(error, LOGIN_FAILURE))
    }
}

/***** Comments *****/
function* loadComments(data) {
    try {
        const response = yield call(messagesApi.loadComments, data.payload);
        checkResponseStatus(response);
        yield put(commentActions.success({comments: response}, COMMENTS_LOAD_SUCCESS));
    } catch (error) {
        yield put(commentActions.failure(error, COMMENTS_LOAD_FAILURE));
    }
}

function* postComment(data) {
    try {
        const response = yield call(messagesApi.postComment, data.payload);
        checkResponseStatus(response);
        yield put(commentActions.success({new_comment: response}, COMMENT_POST_SUCCESS));
    } catch (error) {
        yield put(commentActions.failure(error, COMMENT_POST_FAILURE));
    }
}

/***** Messages *****/
function* loadMessages(data) {
    try {
        const response = yield call(messagesApi.loadMessages, data.payload);
        checkResponseStatus(response);
        yield put(messageActions.success(response, MESSAGES_LOAD_SUCCESS));
    } catch (error) {
        yield put(messageActions.failure(error, MESSAGES_LOAD_FAILURE));
    }
}

function* loadUserMessages(data) {
    try {
        const response = yield call(messagesApi.loadUserMessages, data.payload);
        checkResponseStatus(response);
        yield put(messageActions.success(response, MESSAGES_USER_LOAD_SUCCESS));
    } catch (error) {
        yield put(messageActions.failure(error, MESSAGES_USER_LOAD_FAILURE));
    }
}

function* postMessage(data) {
    try {
        const response = yield call(messagesApi.postMessage, data.payload);
        checkResponseStatus(response);
        yield put(messageActions.postMessageSuccess(response));
    } catch (error) {
        yield put(messageActions.failure(error, MESSAGE_POST_FAILURE));
    }
}

function* openMessage(data) {
    try {
        const response = yield call(messagesApi.openMessage, data.payload);
        checkResponseStatus(response);
        yield put(messageActions.openMessageSuccess(response));
    } catch (error) {
        yield put(messageActions.failure(error, MESSAGE_OPEN_FAILURE));
    }
}
function* openMessagePersonal(data) {
    try {
        const response = yield call(messagesApi.openMessage, data.payload);
        checkResponseStatus(response);
        yield put(messageActions.openMessagePersonalSuccess(response));
    } catch (error) {
        yield put(messageActions.failure(error, MESSAGE_OPEN_PERSONAL_FAILURE));
    }
}

/***** Galery *****/
function* getGalleryUser(data) {
    try {
        const response = yield call(galleryApi.getGalleryForUser, data.payload);
        checkResponseStatus(response);
        yield put(commonActions.success(response, GET_GALLERY_USER_SUCCESS));
    } catch (error) {
        yield put(commonActions.failure(error, GET_GALLERY_USER_FAILURE));
    }
}

/** watchers */
export function* watchLogin() {
    yield* takeEvery(LOGIN_BASIC, auth);
}

export function* watchMessagesLoad() {
    yield* takeEvery(MESSAGES_LOAD, loadMessages);
}

export function* watchUserMessagesLoad() {
    yield* takeEvery(MESSAGES_USER_LOAD, loadUserMessages);
}

export function* watchMessagePost() {
    yield* takeEvery(MESSAGE_POST, postMessage);
}

export function* watchMessageOpen() {
    yield* takeEvery(MESSAGE_OPEN, openMessage);
}

export function* watchMessagePersonalOpen() {
    yield* takeEvery(MESSAGE_OPEN_PERSONAL, openMessagePersonal);
}
export function* watchCommentPost() {
    yield* takeEvery(COMMENT_POST, postComment);
}

export function* watchCommentsLoad() {
    yield* takeEvery(COMMENTS_LOAD, loadComments);
}

export function* watchGetGalleryUser() {
    yield* takeEvery(GET_GALLERY_USER, getGalleryUser);
}
