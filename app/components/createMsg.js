import { SegmentedControls } from 'react-native-radio-buttons';

var React = require('react-native');
var Routes = require('../config/routes');
var InputMessage = require('./inputMessage');
var InputObject = require('./inputObject');

var {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Navigator,
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        marginTop: 65,
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
            view = <InputObject />;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.error}> {this.props.error} </Text>
                <SegmentedControls
                    options={ options }
                    onSelection={ (type) => this.setState({message_type: type}) }
                    selectedOption={ this.state.message_type }
                />
                {view}
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
        return null;
    },
    Title(route, navigator, index, navState) {
        return null;
    }
};

module.exports = CreateMsg;
