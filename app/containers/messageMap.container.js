import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageActions from '../actions/messages.actions';

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
    Image,
    TouchableOpacity
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.messages.messages.length != this.state.markers.length) {
            this._createMarkers(nextProps.messages.messages);
        } else {
            this.setState({messages: {error: 'There has been an error'}});
        }
    }

    _createMarkers(data) {
        var markers = [];
        if (data.length == 0) {
            return;
        }

        var x;
        for (x in data) {
            var lng = 0;
            var lat = 0;
            if (data[x].hasOwnProperty("location") && typeof data[x].location != 'undefined') {
                lng = this._getFloat(data[x].location.lng);
                lat = this._getFloat(data[x].location.lat);
            }

            markers.push({
                longitude: lng,
                latitude: lat,
                title: 'Message',
                detailCalloutView: (
                    <View style={styles.messageContainer}>
                        <Text>
                            { data[x].text }
                        </Text>
                        <TouchableOpacity>
                            <Text>
                                see more ...
                            </Text>
                        </TouchableOpacity>
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
                this.props.loadMessages(position.coords, 5);
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

    _renderError() {
        return (
            <View style={styles.mainContainer}>
                <Text>
                    {this.props.messages.error}
                </Text>
            </View>
        );
    }

    render() {
        if(this.props.messages.error){
            return this._renderError();
        }
        if (this.state.markers.length == 0) {
            return this._renderLoadingView();
        }
        return (
            <MessageMap
                markers = {this.state.markers}
                updateMarkers = { () => this._getMarkers}
                navigator = {this.props.navigator}
                position = {this.state.position}
                error = {this.props.messages.error}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        messages: store.messages
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMessages: bindActionCreators(messageActions.loadMessages, dispatch)
    };
};

MessageMapContainer = connect(mapStateToProps, mapDispatchToProps)(MessageMapContainer);


module.exports = MessageMapContainer;
