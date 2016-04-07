import {connect} from "react-redux";
import {bindActionCreators} from "redux";
var React = require('react-native');
//var Icon = require('react-native-vector-icons/Ionicons');
var Profile = require('../components/profile');
class ProfileContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Profile
                user = {this.props.user}
                navigator = {this.props.navigator}
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

