var React = require('react-native');

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TextInput
    } = React;

//var ARViewDelegate = require('NativeModules');
var ARViewDelegate = require('NativeModules').ARViewDelegate;

var mapView = require('./mapView');
var createMsg = require('./createMsg');

var styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        marginTop: 65,
        alignItems: 'stretch'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    formInput: {
        height: 36,
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
        flex: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#555555",
        borderRadius: 8,
        color: "#555555"
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
    button: {
        height: 36,
        flex: 1,
        backgroundColor: "#555555",
        borderColor: "#555555",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    }
});

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    _onSubmitPressed() {
        this.props.navigator.push({
            title: 'Map view',
            component: mapView,
            rightButtonTitle: '+',
            onRightButtonPress: () => this._handleRightButtonPress()
        })
    }

    _onStartAR(){
        console.log(ARViewDelegate);
        ARViewDelegate.startAR(true);

    }

    _handleRightButtonPress() {
        this.props.navigator.push({
            component: createMsg,
            title: 'Create a message'
        })
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <TextInput
                    placeholder="Username"
                    onChange={(event) => this.setState({username: event.nativeEvent.text})}
                    style={styles.formInput}
                    value={this.state.username} />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChange={(event) => this.setState({password: event.nativeEvent.text})}
                    style={styles.formInput}
                    value={this.state.password} />
                <TouchableHighlight onPress={(this._onSubmitPressed.bind(this))} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={(this._onStartAR.bind(this))} style={styles.button}>
                    <Text style={styles.buttonText}>Start AR</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = Main;