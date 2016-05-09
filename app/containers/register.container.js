import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "../actions/user.actions";

var React = require('react-native');
var Registration = require('../components/registration');
var Navigation = require('../components/navigation');


class RegisterContainer extends React.Component {

    render() {
        var c =
            <Registration
                registerUser={(user) => this.props.registerUser(user)}
            />;
        return (
            <Navigation
                component={c}
                navigator={this.props.navigator}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        error: store.user.error,
        register: store.user.register
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: bindActionCreators(userActions.registerUser, dispatch)
    };
};

RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);

module.exports = RegisterContainer;
