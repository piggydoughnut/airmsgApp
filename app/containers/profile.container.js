import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "../actions/user.actions";
var React = require('react-native');
var Profile = require('../components/profile');
var Navigation = require('../components/navigation');
var ProfileEdit = require('../components/editProfile');

class ProfileContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
    }

    _saveUser(user) {
        this.props.editUser(user, this.props.token.access_token);
        this.setState({edit:false});
    }

    render() {
        var right = undefined;
        var left = undefined;
        var component = undefined;
        if(!this.state.edit){
            right = {
                fn: () => { this.setState({edit:true}) },
                text: 'Edit'
            };
            component =
                <Profile
                    user={this.props.user}
                    navigator={this.props.navigator}
                />;
        } else {
            left = {
                fn: () => { this.setState({edit:false}) },
                text: 'Cancel'
            }
            component =
                <ProfileEdit
                    user={this.props.user}
                    navigator={this.props.navigator}
                    saveUser={(user) => {this._saveUser(user)}}
                />;

        }

        var conf = {right: right, left:left, component: component, title: 'Profile'};
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
        token: store.user.tokenInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: bindActionCreators(userActions.editUser, dispatch)
    };
};

ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);


module.exports = ProfileContainer;

