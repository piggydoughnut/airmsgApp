var React = require('react-native');

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    SliderIOS,
    Navigator,
    Picker
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        alignItems: 'stretch'
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
        backgroundColor: "#555555",
        borderColor: "#555555",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    },
});

class CreateMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loc: "",
            message: "",
            value: 0,
            message_type: 0
        };
        this._onPress = this._onPress.bind(this);
        this._postMessage = this._postMessage.bind(this);
    }

    _onPress() {
        this._postMessage();

    }

    _postMessage() {
        var data = {
            validity: this.state.value,
            text: this.state.message,
            location: {
                lat: this.props.route.props.position.lat,
                lng: this.props.route.props.position.lng
            }
        };
        fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseData) => {
                alert(JSON.stringify(responseData));
            })
            .done();
        this.props.navigator.pop();
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
            <View style={styles.container}>
                <Text> Message type: </Text>
                <Picker
                    selectedValue={this.state.message_type}
                    onValueChange={(type) => this.setState({message_type: type})}>
                    <Picker.Item label="Text message" value="1" />
                    <Picker.Item label="Chat" value="2" />
                    <Picker.Item label="3D object" value="3" />
                </Picker>
                <Text> Your message: </Text>
                <TextInput
                    required={true}
                    placeholder="Message"
                    onChange={(event) => this.setState({message: event.nativeEvent.text})}
                    style={styles.formInput}
                    value={this.state.message} />
                <Text> Validity of your message in hours: </Text>
                <SliderIOS
                    maximumValue={10}
                    step={1}
                    onValueChange={(value) => this.setState({value: value})} />
                <Text> {this.state.value} </Text>
                <TouchableHighlight onPress={() => this._onPress()} style={styles.button}>
                    <Text style={styles.buttonText}>Leave message</Text>
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

module.exports = CreateMsg;
