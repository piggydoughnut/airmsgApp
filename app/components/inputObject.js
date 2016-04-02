var React = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    SliderIOS
    } = React;

var styles = StyleSheet.create({
    mainContainer: {
        padding: 0,
        marginTop: 30,
        alignItems: 'center'
    },
    formInput: {
        height: 250,
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 15,
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

class InputObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            value: 0
        };
    }

    render() {
        return (
            <View style={styles.messageContainer}>
                <TextInput
                    multiline={true}
                    required={true}
                    placeholder="INPUT 3D"
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
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = InputObject;