import {UPDATE_LOCATION} from "../actions/location.actions";
import {
    LOGOUT
} from "../actions/auth.actions";

// initial state is an empty array
const location = (state = [], action) => {
    switch (action.type) {
        case UPDATE_LOCATION:{
            return action.payload.location;
        }
        case LOGOUT:
            return [];
        default:
            return state;
    }
};

export default location;
