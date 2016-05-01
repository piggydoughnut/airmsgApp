var api = require('../config/api');
import {get} from "./default.api";

export function getGalleryForUser(data, token) {
    var params = data.page ? '?page=' + data.page : '';
    return get(api.domain + "/files/gallery/user/" + data.id + params, data.token);
}