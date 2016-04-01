var React = require('react-native');
var MessageMap = require('../components/messageMap');
var Marker = require('../components/marker');

var {
    View,
    Text,
    StyleSheet,
    PropTypes,
    TextInput,
    Navigator,
    Image
    } = React;


var styles = StyleSheet.create({
    picture: {
        width: 20,
        height: 50
    },
    mainContainer: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    messageContainer: {
        padding: 20,
        marginTop: 15,
        marginRight: 15,
        alignItems: 'stretch'
    }
});

class MessageMapContainer extends React.Component {

    constructor(props) {
        super(props);
        this._getMessages = this._getMessages.bind(this);
        this._getMarkers = this._getMarkers.bind(this);
        this._getFloat = this._getFloat.bind(this);
        this.state = {
            messages: [],
            markers: []
        };
        // the functions need to be bound to the component instance before being passed as prop
        // otherwise this variable in the body of the function will not refer to the component instance but to window
    }

    componentDidMount() {
        this._getMarkers();
    }

    _getMessages(position) {
        fetch("http://localhost:3000/messages",
            {method: "GET"})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    messages: responseData
                });
                this._createMarkers();
            })
            .done();
    }

    _createMarkers() {
        var markers = [];
        if (this.state.messages.length == 0) {
            return;
        }

        for (var i = 0; i < this.state.messages.length; i++) {
            var lng = 0;
            var lat = 0;
            if (typeof this.state.messages[i].location != 'undefined') {
                lng = this._getFloat(this.state.messages[i].location.lng);
                lat = this._getFloat(this.state.messages[i].location.lat);
            }

            markers.push({
                longitude: lng,
                latitude: lat,
                title: 'Message',
                detailCalloutView: (
                    <View style={styles.messageContainer}>
                        <Text>
                            { this.state.messages[i].text }
                        </Text>
                        <Text>
                            see more ...
                        </Text>
                    </View>
                ),
                view: <Image style={styles.picture} source={require('../../public/img/msg.png')}/>
            });
        }
        this.setState({
            markers: markers
        });
    }

    _getFloat(integer) {
        if (!(integer.isInteger)) {
            return parseFloat(integer);
        }
        return null;
    }

    _getMarkers() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (!position.coords) {
                    return;
                }
                this.setState({
                    position: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
                this._getMessages(position.coords);
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    _renderLoadingView() {
        return (
            <View style={styles.mainContainer}>
                <Text>
                    Loading map...
                </Text>
            </View>
        );
    }

    render() {
        if (this.state.markers.length != this.state.messages.length) {
            return this._renderLoadingView();
        }
        return (
            <MessageMap
                markers = {this.state.markers}
                updateMarkers = { () => this._getMarkers}
                navigator = {this.props.navigator}
                position = {this.state.position}
            />
        );
    }
}

module.exports = MessageMapContainer;
