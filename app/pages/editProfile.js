var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var {
    Appregistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    TextInput,
    } = React;

var styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        marginTop: 65,
        alignItems: 'stretch'
    },
    picture: {
        width: 250,
        height: 250
    },
    info: {
        fontSize: 20,
        padding: 10,
        color: "black"
    },
    rightIcon: {
        paddingRight: 10
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

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            birthday: '2000-11-11'
        };
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
                <Image
                    style={styles.picture}
                    source={require('../../public/img/profile.jpg')}sdfds
                />

                <TextInput
                    style={styles.formInput}
                    placeholder="Michelle"
                    onChange={(event) => this.setState({username: event.nativeEvent.text})}
                />
                <TouchableHighlight onPress={(this._saveUser.bind(this))} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                onPress={() => navigator.parentNavigator.pop()}>
                <Text style={{color: 'white', margin: 10}}>
                    Cancel
                </Text>
            </TouchableOpacity>
        );
    },
    RightButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                onPress={() => navigator.parentNavigator.pop()}>
            </TouchableOpacity>
        );
    },
    Title(route, navigator, index, navState) {
        return null;
    }
};

module.exports = EditProfile;
