import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as authActions from "../actions/auth.actions";

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
        marginTop: 10,
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
    }
});

var CustomSceneConfig = Object.assign({},
    Navigator.SceneConfigs.PushFromRight, {
        gestures: {
            pop: null
        }
    });

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            error: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({error: null});
        if (nextProps.hasOwnProperty('error') && nextProps.error !== undefined) {
            this.setState({error: nextProps.error});
        }
        if (nextProps.hasOwnProperty('tokenInfo') && nextProps.tokenInfo !== undefined) {
            this.props.navigator.push({
                id: Routes.messageMap,
                title: 'Message Map',
                sceneConfig: CustomSceneConfig
            });
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

    _onBasicLoginPressed() {
        if (this.state.username && this.state.password) {
            this.props.basicLogin({
                username: this.state.username,
                password: this.state.password
            });
        }
    }

    _onRegisterPress() {
        this.props.navigator.push({id: Routes.register});
    }

    renderScene(route, navigator) {

        return (
            <View style={styles.mainContainer}>
                <Image
                    style={styles.picture}
                    source={require('../../public/img/bottle-message.png')}
                />
                <Text style={styles.error}> {this.state.error}</Text>
                <TextInput
                    placeholder="Username"
                    onChange={(event) => this.setState({username: event.nativeEvent.text})}
                    style={styles.formInput}
                    value={this.state.username}/>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChange={(event) => this.setState({password: event.nativeEvent.text})}
                    style={styles.formInput}
                    value={this.state.password}/>

                <TouchableHighlight onPress={(this._onBasicLoginPressed.bind(this))} style={styles.button}>
                    <Text style={styles.buttonText}>Enter</Text>
                </TouchableHighlight>
                <Text>
                    {"\n"}
                    or
                </Text>
                <TouchableHighlight onPress={(this._onRegisterPress.bind(this))} style={styles.button}>
                    <Text style={styles.buttonText}>Become a member</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        tokenInfo: store.user.tokenInfo,
        error: store.user.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        basicLogin: bindActionCreators(authActions.basicLogin, dispatch)
    };
};

MainContainer = connect(mapStateToProps, mapDispatchToProps)(MainContainer);

module.exports = MainContainer;
