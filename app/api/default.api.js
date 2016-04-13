var React = require('react-native');

export function checkStatus(response) {
    console.log(response.status);
    if (response.status >= 200 && response.status < 300) {
        // console.log(response.status);
        return response
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        // console.log(error.response);
        throw error
    }
}

export function errorModal(error){
    console.log(error);
    React.AlertIOS.alert(
        'Error',
        'There seems to be an issue connecting to the network.'
    );
}


