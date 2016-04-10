/** API Calls to /messages */
var api = require('../config/api');

export function postMessage(data) {
    fetch(api.domain + "/messages", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((responseData) => {
            return JSON.stringify(responseData)
        });
}

export function loadMessages(data) {
    return fetch(api.domain + "/messages",
        {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            return responseData
        });
}

export function openMessage(id) {
    return fetch(api.domain + "/messages/" + id,
        {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            return responseData
        });
}

export function postComment(comment) {
    fetch(api.domain + '/messages/' + comment.parent + '/comments', {
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