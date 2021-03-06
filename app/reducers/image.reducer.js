import {IMAGE_OPEN} from "../actions/image.actions";
import {
    LOGOUT
} from "../actions/auth.actions";

// initial state for messages is an empty array
const image = (state = [], action) => {
    switch (action.type) {
        case IMAGE_OPEN:{
            return {
                image: action.payload
            };
        }
        case LOGOUT:
            return null;
        default:
            return null;
    }
};

export default image;
