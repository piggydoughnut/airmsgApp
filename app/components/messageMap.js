var React = require('react-native');
var SideMenu = require('react-native-side-menu');
var Menu = require('../components/menu');
var Routes = require('../config/routes');
var Callout = require('./callout');
var MapView = require('../../node_modules/react-native-maps/index');

var {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    PropTypes,
    Navigator,
} = React;

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
        bottom: 0
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
    },
    navigationBar: {
        backgroundColor: '#246dd5',
        alignItems: 'center'
    }
});

class MessageMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            region: undefined,
            annotations: [],
            position: {}
        };
        this._onRegionChange = this._onRegionChange.bind(this);
    }

    _onRegionChange(region) {
        this.setState({region});
    }

    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
                    <Navigator.NavigationBar
                        style={styles.navigationBar}
                        routeMapper={NavigationBarRouteMapper({position: this.props.position}
                        )}
                    />
                    }
            />
        );
    }

    renderScene(route, navigator) {
        const menu = <Menu navigator={this.props.navigator}/>;
        return (
            <SideMenu menu={menu}>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        region={this.state.region}
                        onRegionChange={this._onRegionChange}
                        showsUserLocation={true}
                    >
                        {this.props.markers.map(marker => (
                            <MapView.Marker
                                key={marker._id}
                                coordinate={marker.location}
                                description={marker.description}
                                pinColor={'#B24BDE'}
                            >
                                <MapView.Callout>
                                    <Callout
                                        message={marker}
                                        detailPage={(msg) => this.props.detailPage(msg)}
                                    />
                                </MapView.Callout>
                            </MapView.Marker>
                        ))}
                    </MapView>
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
                                id: Routes.createMsg,
                                props: props
                              });
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

MessageMap.propTypes = {
    markers: PropTypes.array.isRequired,
    updateMarkers: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired
};

module.exports = MessageMap;
