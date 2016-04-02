import { combineReducers } from 'redux'
import messages from './messages.reducer'
import user from './user.reducer'

const airMsgApp = combineReducers({
    messages,
    user
});

export default airMsgApp;
