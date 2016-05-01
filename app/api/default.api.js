var React = require('react-native');

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        errorModal(response);
    }
}

export function errorModal(error){
    console.log(error);
    React.AlertIOS.alert(
        'Error',
        'There seems to be an issue connecting to the network. Please try again later. If it repeats please contact support.'
    );
}

export function checkResponseStatus(status){
    if(status == 403){
        throw 'Invalid credentials'
    }
}


