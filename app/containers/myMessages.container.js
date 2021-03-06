import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as messagesActions from "../actions/messages.actions";
var React = require('react-native');
var MyMessages = require('../components/myMessages');
var Loading = require('../components/loading');
var Routes = require('../config/routes');
var Navigation = require('../components/navigation');

class MyMessagesContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userMessages: [],
            loading: true
        };
        this.props.loadUserMessages(this.props.user._id, this.props.token);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.detail !== undefined &&
            this.props.detail == undefined
        ) {
            return this.props.navigator.push({
                    id: Routes.messageDetail
                }
            );
        }

        if (nextProps.userMessages !== undefined) {
            return this.setState({
                userMessages: nextProps.userMessages,
                loading: false
            });
        }
    }

    openMessage(msg) {
        this.props.openMessage(msg, this.props.token, null);
    }

    loadUserMessages(page) {
        if (page == undefined || page == 0) {
            page = 1;
        }
        this.props.loadUserMessages(this.props.user._id, this.props.token, page);
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        var component =
            <MyMessages
                userMessages={this.state.userMessages}
                navigator={this.props.navigator}
                loadUserMessages={(page) => this.loadUserMessages(page)}
                showDetail={(msg) => this.openMessage(msg)}
            />
        var conf = {title: 'My messages'};
        return (
            <Navigation
                component={component}
                navigator={this.props.navigator}
                conf={conf}
            />
        );
    }

}

const mapStateToProps = (store) => {
    return {
        user: store.user.user,
        userMessages: store.user.messages,
        detail: store.user.messageDetail,
        token: store.user.tokenInfo.access_token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserMessages: bindActionCreators(messagesActions.loadUserMessages, dispatch),
        openMessage: bindActionCreators(messagesActions.openMessagePersonal, dispatch),
    };
};

MyMessagesContainer = connect(mapStateToProps, mapDispatchToProps)(MyMessagesContainer);

module.exports = MyMessagesContainer;
