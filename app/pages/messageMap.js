var React = require('react-native');
var SideMenu = require('react-native-side-menu');
var Menu = require('../components/menu');

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    MapView,
    PropTypes,
    TextInput,
    MapRegionInput,
    AlertIOS,
    Navigator,
    } = React;

var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 35,
        alignItems: 'stretch'
    },
    map: {
        height: 600
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput: {
        width: 150,
        height: 20,
        borderWidth: 0.5,
        borderColor: '#aaaaaa',
        fontSize: 13,
        padding: 4
    },
    changeButton: {
        alignSelf: 'center',
        marginTop: 5,
        padding: 3,
        borderWidth: 0.5,
        borderColor: '#777777'
    }
});

class MessageMap extends React.Component {
    messages;
    position;
    markers = [];

    constructor(props) {
        super(props);
        this.state = {
            isFirstLoad: true,
            mapRegion: undefined,
            mapRegionInput: '',
            annotations: []
        };
        // the functions need to be bound to the component instance before being passed as prop
        // otherwise this variable in the body of the funciton will not refer to the component instance but to window
        this._onRegionChange = this._onRegionChange.bind(this);
        this._onRegionChangeComplete = this._onRegionChangeComplete.bind(this);
        this._getMessages = this._getMessages.bind(this);
    }

    _getMessages(position) {
        fetch("http://localhost:3000/messages",
            {method: "GET"})
            .then((response) => response.json())
            .then((responseData) => {
                this.messages = responseData;
                this._createMarkers(this.messages);
            })
            .done();
    }

    _createMarkers(messages) {
        if (!messages) {
            return;
        }

        for (var i = 0; i < messages.length; i++) {
            var lng = 0;
            var lat = 0;
            if (typeof messages[i].location != 'undefined' && !(messages[i].location.lng.isInteger)) {
                lng = parseFloat(messages[i].location.lng);
            }
            if (typeof messages[i].location != 'undefined' && !(messages[i].location.lat.isInteger)) {
                lat = parseFloat(messages[i].location.lat);
            }
            this.markers.push({
                longitude: lng,
                latitude: lat,
                title: 'Message ' + (i + 1),
                subTitle: messages[i].text
            });
        }
    }

    _getMarkers() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.position = position.coords;
                if (!this.position) {
                    return;
                }
                this._getMessages(this.position);
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    _onRegionChange(region) {
        this.setState({
            mapRegionInput: region
        });
    }

    _onRegionChangeComplete(region) {
        if (this.state.isFirstLoad) {
            this.setState({
                mapRegionInput: region,
                annotations: this._getMarkers(),
                isFirstLoad: false
            });
        }
    }

    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
                    <Navigator.NavigationBar style={{backgroundColor: '#246dd5', alignItems: 'center'}}
                        routeMapper={NavigationBarRouteMapper} />
                    } />
        );
    }

    renderScene(route, navigator) {
        const menu = <Menu navigator={navigator}/>;
        return (

            <SideMenu menu={menu}>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        onRegionChange={this._onRegionChange}
                        onRegionChangeComplete={this._onRegionChangeComplete}
                        region={this.state.mapRegion}
                        annotations={this.markers}
                        showsUserLocation={true}
                        followUserLocation={true}
                    />
                    <Text style={styles.title}>Initial position:
                        {this.state.initialPosition}
                    </Text>
                </View>
            </SideMenu>
        );
    }
}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return null;
    },
    RightButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                onPress={() => navigator.parentNavigator.push({id: 'CreateMsg', name: 'Create a msg'})}>
                <Text style={{color: 'white', margin: 10}}>
                    + msg
                </Text>
            </TouchableOpacity>
        );
    },
    Title(route, navigator, index, navState) {
        return null;
    }
};

module.exports = MessageMap;