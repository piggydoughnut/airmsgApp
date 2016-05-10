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
            <ScrollView>
                <Text style={s.error}>{ this.state.validation }</Text>
                <TextInput
                    multiline={true}
                    required={true}
                    placeholder="your message..."
                    onChange={(event) => this.setState({message: event.nativeEvent.text})}
                    style={s.postInput}
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


                <TouchableHighlight onPress={() => this._onPress()} style={s.simpleButtonStretch}>
                    <Text style={s.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

module.exports = InputObject;