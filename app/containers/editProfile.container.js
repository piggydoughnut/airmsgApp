var React = require('react-native');
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

var EditProfile = require('../components/editProfile');

class EditProfileContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _saveUser() {
        try {
            fetch("http://localhost:3000/users/56ebe2c5871fc6eb9cd08bcc", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                })
                .done();
            this.props.navigator.pop();
        } catch (e) {
            console.error(e.message);
        }
    }

    render() {
        return (
            <EditProfile
                user={this.props.user}
                navigator={this.props.navigator}
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

EditProfileContainer = connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer);


module.exports = EditProfileContainer;
