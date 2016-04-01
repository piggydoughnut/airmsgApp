/** API Calls to /messages */

export function postMessage(data) {
    var response = '';
    fetch("http://localhost:3000/messages", {
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