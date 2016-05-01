import {COMMENTS_LOAD_SUCCESS, COMMENT_POST_SUCCESS, COMMENT_POST_FAILURE} from "../actions/comments.actions";

const comments = (state = [], action) => {
    switch (action.type) {
        case COMMENT_POST_FAILURE:
            return {
                error: action.payload.error
            }
        case COMMENTS_LOAD_SUCCESS:
            return action.payload.comments;
        default:
            return state;
    }
};

export default comments;
