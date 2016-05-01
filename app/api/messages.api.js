/** API Calls to /messages */
var api = require('../config/api');
import {checkStatus, get} from "./default.api";
var React = require('react-native');

export function loadMessages(data) {
    return get(api.domain + "/messages?lng=" + data.position.longitude + '&lat=' + data.position.latitude, data.token)
}

export function loadComments(data) {
    return get(api.domain + "/messages/" + data.id + '/comments', data.token);
}

export function openMessage(data) {
    return get(api.domain + "/messages/" + data.id, data.token);
}


export function postMessage(data) {
    return fetch(api.domain + "/messages", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.token
        },
        body: JSON.stringify(data.data)
    })
        .then(checkStatus)
        .then((response) => response.json())
        .then((responseData) => {
            return responseData;
        });
}

export function postComment(comment) {
    return fetch(api.domain + '/messages/' + comment.parent + '/comments', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
        .then((response) => response.json())
        .then((responseData) => {
            return JSON.stringify(responseData);
        });
}
