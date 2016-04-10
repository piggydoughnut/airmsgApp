import { combineReducers } from 'redux'
import messages from './messages.reducer'
import user from './user.reducer'
import image from './image.reducer'
import comments from './comments.reducer'

const airMsgApp = combineReducers({
    messages,
    user,
    image,
    comments
});

export default airMsgApp;
