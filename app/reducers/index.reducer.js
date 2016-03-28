import { combineReducers } from 'redux'
import messages from './messages.reducer'
import login from './login.reducer'

const airMsgApp = combineReducers({
    messages,
    login
});

export default airMsgApp;
