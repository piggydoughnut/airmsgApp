import * as messageActions from '../actions/messages.actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var React = require('react-native');
var CreateMsg = require('../components/createMsg');
var Routes = require('../config/routes');

var {
    StyleSheet,
    } = React;

class CreateMsgContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loc: "",
            message: "",
            value: 0,
            message_type: 0,
            error: false
        };
        this._postMessage = this._postMessage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.error) {
            this.props.navigator.push({
                id: Routes.messageMap
            });
        } else {
            this.setState({error: 'There has been an error'});
        }
    }

    _postMessage(data) {
        this.props.postMessage(data);
    }

    render() {
        return (
            <CreateMsg
                post = { (data) => this._postMessage(data)}
                navigator = {this.props.navigator}
                location = {this.props.route.props.position}
                error = {this.state.error}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        error: store.messages.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        postMessage: bindActionCreators(messageActions.postMessage, dispatch)
    };
};

CreateMsgContainer = connect(mapStateToProps, mapDispatchToProps)(CreateMsgContainer);


module.exports = CreateMsgContainer;
