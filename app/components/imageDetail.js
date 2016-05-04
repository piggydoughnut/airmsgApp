var React = require('react-native');
var s = require('../styles/style');
var {
    StyleSheet,
    Image,
    Navigator,
    TouchableOpacity,
    Text
} = React;

var styles = StyleSheet.create({
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        resizeMode: Image.resizeMode.contain,
        width: null,
        height: null
    }
});

class ImageDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
                    <Navigator.NavigationBar style={s.navigator}
                        routeMapper={NavigationBarRouteMapper} />
                    }
            />
        );
    }

    renderScene() {
        return (
            <Image source={{uri: this.props.image}} style={styles.image}/>
        );
    }
}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                              onPress={() => navigator.parentNavigator.pop()}>
                <Text style={{color: 'white', margin: 10}}>
                    Back
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

module.exports = ImageDetail;
