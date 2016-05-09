var React = require('react-native');
var api = require('../config/api');
var s = require('../styles/style');
var {
    ScrollView,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
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
        backgroundColor: "#9090c4",
        borderColor: "#9090c4",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    },
    picture: {
        width: 200,
        height: 180
    },
    camera: {
        margin: 20,
        alignItems: 'center'
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

    _onPress(){
        this.setState({validation: null});
        if(!this.props.chosenObject){
            this.setState({validation: 'You forgot to choose a 3d object'});
            return;
        }
        if(this.state.message==null || this.state.message == '' || this.state.message == undefined){
            this.setState({validation: 'Did you forget to write a message?'});
            return;
        }
        var data = {
            validity: this.state.value,
            text: this.state.message,
            obj: {
                id: this.props.chosenObject._id,
                obj_file_path: this.props.chosenObject.obj_file_path
            }
        };
        this.props.postMessage(data);
    }

    render() {
        var source = (this.props.chosenObject !== undefined && this.props.chosenObject !== null) ? {uri: api.domain + this.props.chosenObject.thumb_file_path} : require('../../public/cube.png');
        return (
            <ScrollView style={styles.messageContainer}>
                <Text style={s.error}>{ this.state.validation }</Text>
                <TextInput
                    multiline={true}
                    required={true}
                    placeholder="your message..."
                    onChange={(event) => this.setState({message: event.nativeEvent.text})}
                    style={styles.formInput}
                    value={this.state.message}/>

                <TouchableOpacity onPress={() => this.props.onAddObject()} style={styles.camera}>
                    <Image style={styles.picture} source={source}/>
                </TouchableOpacity>

                <Text> Validity of your message in days: </Text>
                <SliderIOS
                    maximumValue={365}
                    step={1}
                    value={this.state.value}
                    onValueChange={(value) => this.setState({value: value})}/>
                <Text> {this.state.value} </Text>


                <TouchableHighlight onPress={() => this._onPress()} style={styles.button}>
                    <Text style={s.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

module.exports = InputObject;