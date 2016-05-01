/** API Calls to /messages */
var api = require('../config/api');
import {get, post} from "./default.api";
var React = require('react-native');

export function loadMessages(data) {
    return get(api.domain + "/messages?lng=" + data.position.longitude + '&lat=' + data.position.latitude, data.token)
}

export function loadUserMessages(data){
    return get(api.domain + '/messages/user/' + data.id, data.token);
}

export function openMessage(data) {
    return get(api.domain + "/messages/" + data.id, data.token);
}

export function postMessage(data) {
    return post(api.domain + "/messages", data.token, data.message);
}

export function loadComments(data) {
    return get(api.domain + "/messages/" + data.id + '/comments', data.token);
}

export function postComment(data) {
    return post(api.domain + '/messages/' + data.comment.parent + '/comments', data.token, data.comment);
}
