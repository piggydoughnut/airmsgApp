import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as messageActions from "../actions/messages.actions";

var React = require('react-native');
var MessageMap = require('../components/messageMap');
var Error = require('../components/error');
var Loading = require('../components/loading');
var Routes = require('../config/routes');

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

    constructor(props) {
        super(props);
        this._getMarkers = this._getMarkers.bind(this);
        this._viewDetail = this._viewDetail.bind(this);
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
        if (nextProps.messages.hasOwnProperty('messages') &&
            nextProps.messages.messages.length != this.state.markers.length) {
            this._createMarkers(nextProps.messages.messages);
        }
    }

    _createMarkers(data) {
        var markers = [];
        if (data.length == 0) {
            return;
        }

        for (var x in data) {
            markers.push({
                id: data[x]._id,
                coordinates: {
                    longitude: data[x].location.lng,
                    latitude: data[x].location.lat
                },
                title: 'Message',
                description: data[x].text
            });

        }
        this.setState({
            markers: markers
        });
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

    render() {
        if (this.state.messages.hasOwnProperty('error')) {
            return ( <Error error={this.props.messages.error}/>);
        }
        if (this.state.markers.length == 0) {
            return ( <Loading />);
        }
        return (
            <MessageMap
                markers={this.state.markers}
                updateMarkers={ () => this._getMarkers}
                navigator={this.props.navigator}
                position={this.state.position}
                error={this.props.messages.error}
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
        loadMessages: bindActionCreators(messageActions.loadMessages, dispatch),
        openMessage: bindActionCreators(messageActions.openMessage, dispatch)
    };
};

MessageMapContainer = connect(mapStateToProps, mapDispatchToProps)(MessageMapContainer);

module.exports = MessageMapContainer;
