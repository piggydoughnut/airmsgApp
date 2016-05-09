import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userActions from "../actions/user.actions";
import {validateEmail, parseValidationErr} from "../util/validation";

var Routes = require('../config/routes');
var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    Image,
    TextInput
} = React;

var styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
    formInput: {
        height: 36,
        padding: 10,
        width: 200,
        marginBottom: 5,
        marginTop: 5,
        flex: 1,
        fontSize: 18,
        borderWidth: 0.5,
        borderColor: "#555555",
        borderRadius: 8,
        color: "#555555",
        alignSelf: "center"
    },
    button: {
        width: 200,
        height: 36,
        flex: 1,
        backgroundColor: "#9090c4",
        borderColor: "#9090c4",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 40,
        justifyContent: "center"
    },
    logo: {
        width: 35,
        height: 35,
        justifyContent: 'center',
    },
    error: {
        fontSize: 16,
        color: 'red'
    },
    welcome: {
        fontSize: 22
    }
});


class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
            error: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.register!==undefined && nextProps.register.error !== undefined ) {
            this.setState({error:  parseValidationErr(nextProps.register.error)});
            return;
        }
        if (nextProps.hasOwnProperty('error') && nextProps.error !== undefined) {
            this.setState({error: nextProps.error});
        }
    }

    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
            />
        );
    }

    _onRegisterPress() {
        this.setState({error: ''});
        if (this.state.email) {
            if (!validateEmail(this.state.email)) {
                this.setState({error: 'Email is not valid'});
                return;
            }
        }
        if (this.state.username === '' || this.state.username === null) {
            this.setState({error: 'Please check your details'});
            return;
        }
        if (this.state.password.length < 8) {
            this.setState({error: 'Password should be at least 8 characters'});
            return;
        }
        this.props.registerUser({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        })
    }


    renderScene(route, navigator) {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.welcome}>Registration</Text>
                <Text style={styles.error}> {this.state.error}</Text>
                <TextInput
                    placeholder="Username"
                    onChange={(event) => this.setState({username: event.nativeEvent.text})}
                    style={styles.formInput}
                    value={this.state.username}/>
                <TextInput
                    placeholder="Email"
                    onChange={(event) => this.setState({email: event.nativeEvent.text})}
                    style={styles.formInput}
                    value={this.state.email}/>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChange={(event) => this.setState({password: event.nativeEvent.text})}
                    style={styles.formInput}
                    value={this.state.password}/>
                <TextInput
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    onChange={(event) => this.setState({password: event.nativeEvent.text})}
                    style={styles.formInput}
                    value={this.state.password}/>

                <TouchableHighlight onPress={(this._onRegisterPress.bind(this))} style={styles.button}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        tokenInfo: store.user.tokenInfo,
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
