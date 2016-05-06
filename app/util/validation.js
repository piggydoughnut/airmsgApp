export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function parseValidationErr(err) {
    if (err.username !== undefined && err.email !== undefined) {
        return 'Username and Email are taken';
    }
    if (err.email !== undefined) {
        return 'Email is taken';
    }
    if (err.username !== undefined) {
        return 'Username is taken';
    }
}
