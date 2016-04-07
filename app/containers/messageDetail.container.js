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
                message = {this.props.messageDetail.msg}
                navigator = {this.props.navigator}
            />
        );
    }
}
const mapStateToProps = (store) => {
    return {
        messageDetail: store.messages.messageDetail
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

MessageDetailContainer = connect(mapStateToProps, mapDispatchToProps)(MessageDetailContainer);

module.exports = MessageDetailContainer;