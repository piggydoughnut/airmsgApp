import {validateEmail, parseValidationErr} from "../util/validation";

var React = require('react-native');
var s = require('../styles/style');
var {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    TextInput
} = React;

var styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center',
    },
    error: {
        fontSize: 16,
        color: 'red'
    },
    welcome: {
        fontSize: 22
    }
});


class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            passwordCheck: null,
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
        if (this.state.password== '' || this.state.password == null || this.state.password.length < 8) {
            this.setState({error: 'Password should be at least 8 characters'});
            return;
        }
        if (this.state.password !== this.state.passwordCheck) {
            this.setState({error: 'The passwords do not match'});
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
                    style={s.formInput}
                    maxLength={150}
                    value={this.state.username}/>
                <TextInput
                    placeholder="Email"
                    onChange={(event) => this.setState({email: event.nativeEvent.text})}
                    style={s.formInput}
                    maxLength={150}
                    value={this.state.email}/>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChange={(event) => this.setState({password: event.nativeEvent.text})}
                    style={s.formInput}
                    maxLength={150}
                    value={this.state.password}/>
                <TextInput
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    onChange={(event) => this.setState({passwordCheck: event.nativeEvent.text})}
                    style={s.formInput}
                    maxLength={150}
                    value={this.state.passwordCheck}/>

                <TouchableHighlight onPress={(this._onRegisterPress.bind(this))} style={s.simpleButton}>
                    <Text style={s.buttonText}>REGISTER</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = Registration;
