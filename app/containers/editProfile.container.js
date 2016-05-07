var React = require('react-native');
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "../actions/user.actions";
var EditProfile = require('../components/editProfile');

class EditProfileContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _saveUser(user) {
        this.props.editUser(user, this.props.token.access_token);
    }

    render() {
        return (
            <EditProfile
                user={this.props.user}
                saveUser={(user) => {this._saveUser(user)}}
                navigator={this.props.navigator}
            />

        );
    }
}


const mapStateToProps = (store) => {
    return {
        user: store.user.user,
        token: store.user.tokenInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: bindActionCreators(userActions.editUser, dispatch)
    };
};

EditProfileContainer = connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer);


module.exports = EditProfileContainer;
