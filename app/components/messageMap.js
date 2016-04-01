var React = require('react-native');
var SideMenu = require('react-native-side-menu');
var Menu = require('../components/menu');
var Routes = require('../config/routes');

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
            isFirstLoad: true,
            mapRegion: undefined,
            mapRegionInput: '',
            annotations: [],
            position: {}
        };
        this._onRegionChange = this._onRegionChange.bind(this);
        this._onRegionChangeComplete = this._onRegionChangeComplete.bind(this);
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
                annotations: this.props.updateMarkers,
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
                        onRegionChange={this._onRegionChange}
                        onRegionChangeComplete={this._onRegionChangeComplete}
                        region={this.state.mapRegion}
                        annotations={this.props.markers}
                        showsUserLocation={true}
                        followUserLocation={true}
                    />
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

MessageMap.propTypes = {
    markers: PropTypes.array.isRequired,
    updateMarkers: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired
};

module.exports = MessageMap;
