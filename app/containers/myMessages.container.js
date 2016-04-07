import {connect} from "react-redux";
import {bindActionCreators} from "redux";
var React = require('react-native');
var MyMessages = require('../components/myMessages');


class MyMessagesContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MyMessages
                userMessages={this.props.userMessages}
                navigator={this.props.navigator}
            />
        );
    }

}

const mapStateToProps = (store) => {
    return {
        userMessages: store.user.user.messages
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

MyMessagesContainer = connect(mapStateToProps, mapDispatchToProps)(MyMessagesContainer);

module.exports = MyMessagesContainer;
