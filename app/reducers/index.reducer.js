import { combineReducers } from 'redux'
import messages from './messages.reducer'
import user from './user.reducer'
import image from './image.reducer'
import comments from './comments.reducer'
import gallery from './gallery.reducer'
import location from './location.reducer'

const airMsgApp = combineReducers({
    messages,
    user,
    image,
    comments,
    gallery,
    location
});

export default airMsgApp;
