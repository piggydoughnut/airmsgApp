import React, {StyleSheet, Text, Navigator, TouchableOpacity} from "react-native";
var s = require('../styles/style');

var styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center'
    },
    leftText: {
        color: 'white',
        margin: 10
    },
    rightText: {
        color: 'white',
        margin: 10
    }
});


class Navigation extends React.Component {

    render() {
        console.log(this.props);
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
                    <Navigator.NavigationBar style={s.navigator}
                        routeMapper={NavigationBarRouteMapper(this.props.conf)} />
                    }
            />
        );
    }

    renderScene(route, navigator) {
        return (this.props.component);
    }

}

var NavigationBarRouteMapper = conf => ({
    LeftButton(route, navigator, index, navState) {
        if(conf==undefined){
            conf={};
        }
        if (conf.left === undefined) {
            conf.left = {
                text: 'Back',
                fn: () => navigator.parentNavigator.pop()
            }
        }
        return (
            <TouchableOpacity style={styles.button} onPress={() => conf.left.fn()}>
                <Text style={styles.leftText}>{conf.left.text}</Text>
            </TouchableOpacity>
        );
    },
    RightButton(route, navigator, index, navState) {
        if(conf==undefined){
            conf={};
        }
        if (conf.right === undefined) {
            conf.right = {
                text: '',
                fn: () => null
            }
        }
        return (
            <TouchableOpacity style={styles.button} onPress={() => conf.right.fn() }>
                <Text style={styles.rightText}>{conf.right.text}</Text>
            </TouchableOpacity>
        );
    },
    Title(route, navigator, index, navState) {
        return null;
    }
});

module.exports = Navigation;
