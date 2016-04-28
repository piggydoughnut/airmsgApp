import {GET_GALLERY_USER_SUCCESS} from "../actions/gallery.actions";

// initial state for messages is an empty array
const gallery = (state = [], action) => {
    switch (action.type) {
        case GET_GALLERY_USER_SUCCESS:
            return {
                gallery: action.payload
            };
        default:
            return {};
    }
};

export default gallery;
