import {UPDATE_LOCATION} from "../actions/location.actions";

// initial state is an empty array
const location = (state = [], action) => {
    switch (action.type) {
        case UPDATE_LOCATION:{
            return action.payload.location;
        }
        default:
            return state;
    }
};

export default location;
