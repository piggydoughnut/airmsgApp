import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageActions from '../actions/messages.actions';

var React = require('react-native');
var MessageDetail = require('../components/messageDetail')

class MessageDetailContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MessageDetail
                message = {this.props.route.props[0]}
                navigator = {this.props.navigator}
            />
        );
    }
}

module.exports = MessageDetailContainer;