var React = require('react-native');

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    Navigator,
    TouchableOpacity
    } = React;

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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    _onSubmitPressed() {
        this.props.navigator.push({
            id: 'MessageMap'
        })
    }

    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
                    <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                        routeMapper={NavigationBarRouteMapper} />
                    }
            />

        );
    }
    renderScene(route, navigator) {
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
            </View>
        );
    }
}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return null;
        //return (
        //    <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
        //        onPress={() => navigator.parentNavigator.pop()}>
        //        <Text style={{color: 'white', margin: 10,}}>
        //            LeftButton
        //        </Text>
        //    </TouchableOpacity>
        //);
    },
    RightButton(route, navigator, index, navState) {
        return null;
    },
    Title(route, navigator, index, navState) {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: 'white', margin: 10, fontSize: 16}}>
                    Login to start viewing
                </Text>
            </TouchableOpacity>
        );
    }
};

module.exports = Login;