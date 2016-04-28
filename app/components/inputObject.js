var React = require('react-native');
var Routes = require('../config/routes');
var api = require('../config/api');
var {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    SliderIOS,
    Image
} = React;

var styles = StyleSheet.create({
    mainContainer: {
        padding: 0,
        marginTop: 30,
        alignItems: 'center'
    },
    formInput: {
        height: 100,
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
        width: 140,
        backgroundColor: "#555555",
        borderColor: "#555555",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    },
    imageContainer: {
        alignItems: 'center',
        margin: 10,
    },
    image: {
        height: 200,
        width: 200,
        margin: 10
    }
});

class InputObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            value: 1,
            validation: ''
        };
    }

    render() {
        var buttonText = 'Choose 3D';
        var chosen = null;
        if (this.props.chosenObject) {
            buttonText = 'Chose another';
            chosen =
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: api.domain + this.props.chosenObject.thumb_file_path}}/>
                </View>

        }
        return (
            <ScrollView style={styles.messageContainer}>
                <Text style={styles.error}>{ this.state.validation }</Text>
                <TextInput
                    multiline={true}
                    required={true}
                    placeholder="your message..."
                    onChange={(event) => this.setState({message: event.nativeEvent.text})}
                    style={styles.formInput}
                    value={this.state.message}/>
                <Text> Validity of your message in hours: </Text>
                <SliderIOS
                    maximumValue={10}
                    step={1}
                    value={this.state.value}
                    onValueChange={(value) => this.setState({value: value})}/>
                <Text> {this.state.value} </Text>
                <TouchableHighlight onPress={() => this.props.onAddObject()} style={styles.button}>
                    <Text style={styles.buttonText}> {buttonText} </Text>
                </TouchableHighlight>
                { chosen }
                <TouchableHighlight onPress={() => this._onPress()} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

module.exports = InputObject;