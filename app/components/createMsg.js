var React = require('react-native');

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    SliderIOS
    } = React;

class createMsg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            message: "",
            value: 0
        };
        this._onPress = this._onPress.bind(this);
        this._postMessage = this._postMessage.bind(this);
    }

    _onPress() {
        this._postMessage();
    }

    _postMessage() {
        console.log(this.state.value);
        console.log(this.state.message);

        fetch("http://private-34b14-dariam89.apiary-mock.com/messages", {
            method: "POST",
            body: JSON.stringify({
                validity: this.state.value,
                text: this.state.message
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                alert(JSON.stringify(responseData));
            })
            .done();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Your message: </Text>
                <TextInput
                    placeholder="Location: current"
                    onChange={(event) => this.setState({location: event.nativeEvent.text})}
                    style={styles.formInput}
                    value={this.state.location} />
                <TextInput
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
        flex: 2,
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

module.exports = createMsg;