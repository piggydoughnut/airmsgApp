import {COMMENTS_LOAD_SUCCESS} from "../actions/comments.actions";

const comments = (state = [], action) => {
    switch (action.type) {
        case COMMENTS_LOAD_SUCCESS:
        {
            return action.payload.comments
        }
        default:
            return state;
    }
};

export default comments;
