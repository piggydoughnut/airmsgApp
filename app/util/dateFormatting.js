export function getFormattedDateYMD(date) {
    if (typeof date != 'undefined') {
        var d = new Date(date);
        return d.getFullYear() + '/' + d.getMonth() + '/' + d.getDay();
    }
}