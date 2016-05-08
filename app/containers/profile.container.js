import {connect} from "react-redux";
import {bindActionCreators} from "redux";
var React = require('react-native');
var Profile = require('../components/profile');
var Navigation = require('../components/navigation');

class ProfileContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var component =
            <Profile
                user={this.props.user}
                navigator={this.props.navigator}
            />;

        var right = {
            fn: ()=>{this.props.navigator.push({id: 'EditProfile'})},
            text: 'Edit'
        };
        var conf = {right: right, component: component};
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
        user: store.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);


module.exports = ProfileContainer;

