var api = require('../config/api');

export function getGalleryForUser(data) {
    var params = data.page ? '?page=' + data.page : '';
    return fetch(api.domain + "/files/gallery/user/" + data.id + params,
        {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            return responseData
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
}