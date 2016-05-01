/** API Calls to /messages */
var api = require('../config/api');
import {checkStatus, errorModal} from "./default.api";
var React = require('react-native');

export function postMessage(data) {
    return fetch(api.domain + "/messages", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(checkStatus)
        .then((response) => response.json())
        .then((responseData) => {
            return responseData;
        });
}

export function loadMessages(data) {
    return fetch(api.domain + "/messages?lng=" + data.position.longitude + '&lat=' + data.position.latitude, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + data.token
        }
    })
        .then((response) => {
            console.log(response);
            if (response.status >= 400) {
                return {
                    status: response.status
                }
            }
            return response.json();
        })
        .then((responseData) => {
            return responseData
        })
        .catch(error => {
            return {
                error: 'Network request failed'
            }
        });
}

export function openMessage(data) {
    return fetch(api.domain + "/messages/" + data.id, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + data.token
        }
    })
        .then((response) => {
            console.log(response);
            if (response.status >= 400) {
                return {
                    status: response.status
                }
            }
            return response.json();
        })
        .then((responseData) => {
            return responseData
        })
        .catch(error => {
            return {
                error: 'Network request failed'
            }
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

export function loadComments(data) {
    return fetch(api.domain + "/messages/" + data.id + '/comments',
        {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            return responseData
        });
}

/**
 * @todo: handle HTTP errors
 */