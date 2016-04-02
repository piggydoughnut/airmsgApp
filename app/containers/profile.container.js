var React = require('react-native');
//var Icon = require('react-native-vector-icons/Ionicons');
var Profile = require('../components/profile');

var {
    Appregistry,
    } = React;

class ProfileContainer extends React.Component {

    constructor(props) {
        super(props);
        this._getUser = this._getUser.bind(this);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        this._getUser();
    }

    _getUser() {
        fetch("http://localhost:3000/users/56ebe2c5871fc6eb9cd08bcc",
            {method: "GET"})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    user: responseData.user
                });
            })
            .done();
    }

    render() {
        return (
            <Profile
                user = {this.state.user}
                navigator = {this.props.navigator}
            />

        );
    }

}
module.exports = ProfileContainer;
