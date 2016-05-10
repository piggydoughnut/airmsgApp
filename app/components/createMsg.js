import { SegmentedControls } from 'react-native-radio-buttons';

var React = require('react-native');
var Routes = require('../config/routes');
var InputMessage = require('./inputMessage');
var InputObject = require('./inputObject');
var s = require('../styles/style');

var {
    View,
    Text,
    StyleSheet,
    Navigator,
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        marginTop: 45,
        alignItems: 'stretch'
    },
    error: {
        fontSize: 16,
        color: 'red'
    }
});

const MESSAGE = 'Message';
const OBJECT = "3D object";

class CreateMsg extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message_type: MESSAGE
        };
        this.props.post = this.props.post.bind(this);
    }

    render() {
        const options = [
            MESSAGE,
            OBJECT
        ];
        var view = <InputMessage
            postMessage={ (data) => this.props.post(data)}
            location = {this.props.location}
            user = { this.props.user}
            onImagePress={ (data) => this.props.onImagePress(data)}
        />;

        if (this.state.message_type == OBJECT) {
            view = <InputObject
                    onAddObject={() => this.props.onAddObject()}
                    chosenObject={this.props.chosen_object}
                    postMessage={ (data) => this.props.post(data)}
                />;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.error}> {this.props.error} </Text>
                <SegmentedControls
                    tint= {'#8b78a5'}
                    selectedTint= {'white'}
                    backTint= {'#d7d2e8'}
                    options={ options }
                    onSelection={ (type) => this.setState({message_type: type}) }
                    selectedOption={ this.state.message_type }
                />
                {view}
            </View>
        );
    }
}

module.exports = CreateMsg;
