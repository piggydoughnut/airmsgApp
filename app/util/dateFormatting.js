export function getFormattedDateYMD(date) {
    if (typeof date != 'undefined') {
        var d = new Date(date);
        return d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate();
    }
}

export function getFormattedDateYMDHM(date) {
    if (typeof date != 'undefined') {
        var d = new Date(date);
        return d.getFullYear() + '/'
            + d.getMonth() + '/'
            + d.getDate() + ' '
            + d.getHours() + ':'
            + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    }
}
