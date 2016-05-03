import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as messageActions from "../actions/messages.actions";
import * as locationActions from "../actions/location.actions";


var React = require('react-native');
var MessageMap = require('../components/messageMap');
var Error = require('../components/error');
var Loading = require('../components/loading');
var Routes = require('../config/routes');
var MessageDetail = require('../components/messageDetail');
var Config = require('../config/api');

var geolib = require('geolib/dist/geolib');

var {
    StyleSheet,
} = React;


var styles = StyleSheet.create({
    picture: {
        width: 20,
        height: 50
    },
});

class MessageMapContainer extends React.Component {

    watchID = null;

    constructor(props) {
        super(props);
        this._getMarkers = this._getMarkers.bind(this);
        this.state = {
            messages: [],
            markers: [],
            position: 'unknown',
            lastPosition: 'unknown',
            error: null
        };
        // the functions need to be bound to the component instance before being passed as prop
        // otherwise this variable in the body of the function will not refer to the component instance but to window
    }

    componentDidMount() {
        this._getMarkers();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.lastPosition != 'unknown' && nextState.position != 'unknown') {
            var lastPosition = {
                latitude: nextState.lastPosition.latitude,
                longitude: nextState.lastPosition.longitude
            };
            var initialPosition = {
                latitude: nextState.position.latitude,
                longitude: nextState.position.longitude
            };
            /** We are getting more messages once we are 25 meters away from our initial point */
            if (geolib.getDistance(lastPosition, initialPosition, 1, 1) > Config.loadDistance) {
                this._getMarkers();
            }
            return true;
        }
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.messages.messages != 'undefined' &&
            nextProps.messages.messages.hasOwnProperty('docs') &&
            nextProps.messages.messages.docs.length != this.state.markers.length) {
            this.setState({
                markers: nextProps.messages.messages.docs,
                error: null
            });
        }
        if (nextProps.messages !== undefined &&
            nextProps.messages.hasOwnProperty('error')
        ) {
            this.setState({error: nextProps.messages.error});
        }
        /**
         * There are is one state in which we show messageDetail -> mount a new view
         * There was no previous messageDetail before but there is one now
         **/
        if (this.props.messages !== undefined &&
            !this.props.messages.hasOwnProperty('messageDetail') &&
            nextProps.messages.hasOwnProperty('messageDetail')
        ) {
            this.setState({error: null});
            this.props.navigator.push({
                    id: Routes.messageDetail
                }
            );
        }
    }

    _openMessage(msg) {
        this.props.openMessage(msg, this.props.token.access_token);
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
                this.props.updateLocation(position.coords);
                this.props.loadMessages(position.coords, this.props.token.access_token);
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            this.setState({lastPosition: position.coords});
        });
    }

    render() {
        if (this.state.error) {
            React.AlertIOS.alert(
                'Error',
                this.state.error
            );
        }
        if (this.state.markers.length == 0 && this.state.messages == undefined ) {
            return ( <Loading />);
        }
        return (
            <MessageMap
                markers={this.state.markers}
                updateMarkers={ () => this._getMarkers}
                detailPage={(msg) => this._openMessage(msg)}
                navigator={this.props.navigator}
                error={this.props.messages.error}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        messages: store.messages,
        token: store.user.tokenInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMessages: bindActionCreators(messageActions.loadMessages, dispatch),
        openMessage: bindActionCreators(messageActions.openMessage, dispatch),
        updateLocation: bindActionCreators(locationActions.updateLocation, dispatch)
    };
};

MessageMapContainer = connect(mapStateToProps, mapDispatchToProps)(MessageMapContainer);

module.exports = MessageMapContainer;
