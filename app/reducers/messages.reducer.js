import {LOAD_MESSAGES} from '../actions/messages.actions'

// initial state for messages is an empty array
const messages = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_MESSAGES':
            return {
                loading: false,
                messages: [
                    {
                        title: 'Hello',
                        text: 'Hello everyone everywhere'
                    }
                ]
            };
        default:
            return state;
    }
};

export default messages;
