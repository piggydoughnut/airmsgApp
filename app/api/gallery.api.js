export function getGalleryForUser(data) {
    console.log(data.id);
    var params = data.page ? '?page=' + data.page : '';
    return fetch(Config.server + "/files/gallery/user/" + data.id + params,
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