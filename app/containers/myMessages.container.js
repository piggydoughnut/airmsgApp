import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as messagesActions from "../actions/messages.actions";
var React = require('react-native');
var MyMessages = require('../components/myMessages');
var Loading = require('../components/loading');


class MyMessagesContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userMessages: [],
            loading: true
        }
        this.props.loadUserMessages(this.props.user._id, this.props.token);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userMessages !== undefined) {
            this.setState({
                userMessages: nextProps.userMessages,
                loading: false
            });
        }
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <MyMessages
                userMessages={this.state.userMessages}
                navigator={this.props.navigator}
            />
        );
    }

}

const mapStateToProps = (store) => {
    return {
        user: store.user.user,
        userMessages: store.user.messages,
        token: store.user.tokenInfo.access_token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserMessages: bindActionCreators(messagesActions.loadUserMessages, dispatch)
    };
};

MyMessagesContainer = connect(mapStateToProps, mapDispatchToProps)(MyMessagesContainer);

module.exports = MyMessagesContainer;
