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
    Image
    } = React;

var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 35,
        alignItems: 'stretch'
    },
    messageContainer: {
        padding: 20,
        marginTop: 15,
        marginRight: 15,
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
    },
    picture: {
        width: 20,
        height: 50
    }
});

class MessageMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFirstLoad: true,
            mapRegion: undefined,
            mapRegionInput: '',
            annotations: [],
            position: {},
            markers: [],
            messages: [],
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
                this.state.messages = responseData;
                this._createMarkers();
                console.log(this.state.markers);
            })
            .done();
    }

    _createMarkers() {
        if (!this.state.messages) {
            return;
        }

        for (var i = 0; i < this.state.messages.length; i++) {
            var lng = 0;
            var lat = 0;
            if (typeof this.state.messages[i].location != 'undefined' && !(this.state.messages[i].location.lng.isInteger)) {
                lng = parseFloat(this.state.messages[i].location.lng);
            }
            if (typeof this.state.messages[i].location != 'undefined' && !(this.state.messages[i].location.lat.isInteger)) {
                lat = parseFloat(this.state.messages[i].location.lat);
            }
            var img='';
            var title='';
            switch(this.state.messages[i].type){
                case 1: {
                    title = 'Message';
                    img = require('../../public/img/msg.png');
                    break;
                }
                case 2: {
                    title = 'Chat';
                    img = require('../../public/img/chat.png');
                    break;
                }
                case 3: {
                    title = '3D object';
                    img = require('../../public/img/3Dobj.png');
                    break;
                }
            }
            this.state.markers.push({
                longitude: lng,
                latitude: lat,
                title: title,
                detailCalloutView:
                    (<View style={styles.messageContainer}>
                        <Text>
                            { this.state.messages[i].text }
                        </Text>
                        <Text>
                            see more ...
                        </Text>
                    </View>),
                view: <Image
                    style={styles.picture}
                    source={img}
                />

            });
        }
    }

    _getMarkers() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.state.position = position.coords;
                if (!this.state.position) {
                    return;
                }
                this._getMessages(this.state.position);
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
                    <Navigator.NavigationBar
                        style={{backgroundColor: '#246dd5', alignItems: 'center'}}
                        routeMapper={NavigationBarRouteMapper({
                                position: {
                                    lat: this.state.position.latitude,
                                    lng: this.state.position.longitude
                                }
                            }
                        )}
                    />
                    }
            />
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
                        annotations={this.state.markers}
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

var NavigationBarRouteMapper = props => ({
    LeftButton(route, navigator, index, navState) {
        return null;
    },
    RightButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                onPress={() => {
                    navigator.parentNavigator.push({
                            id: 'CreateMsg',
                            props: props
                        }
                    );
                }}>
                <Text style={{color: 'white', margin: 10}}>
                    Add Message
                </Text>
            </TouchableOpacity>
        );
    },
    Title(route, navigator, index, navState) {
        return null;
    }
});

module.exports = MessageMap;
