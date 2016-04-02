/** API Calls to /messages */
var api = require('../config/api');

export function postMessage(data) {
    var response = '';
    fetch(api.domain + "/messages", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((responseData) => {
            response = JSON.stringify(responseData)
        })
        .done();
    return response;
}

export function loadMessages(data) {
    var response = '';
    return fetch(api.domain + "/messages",
        {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            return responseData
        });
}
