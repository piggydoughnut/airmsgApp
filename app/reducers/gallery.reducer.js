import {GET_GALLERY_USER_SUCCESS, CHOOSE_GALLERY_OBJECT} from "../actions/gallery.actions";

// initial state for messages is an empty array
const gallery = (state = [], action) => {
    switch (action.type) {
        case GET_GALLERY_USER_SUCCESS:
            return {
                gallery: action.payload
            };
        case CHOOSE_GALLERY_OBJECT:
            return {
                chosen_object: action.payload.obj
            };
        default:
            return {};
    }
};

export default gallery;
