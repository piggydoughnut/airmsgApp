/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    TouchableHighlight,
    TextInput,
    ListView,
    View,
    StatusBarIOS,
    NavigatorIOS,
    AlertIOS
    } from 'react-native';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111'
    },
    textStyle: {
        flex:2,
        fontSize: 20,
        margin: 20
    }
});

var Main = require('./app/components/main');

class AirMsgProject extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute = {{
                    title: "Welcome",
                    component: Main
                }}
            />
        );
    }
}


AppRegistry.registerComponent('AirMsgProject', () => AirMsgProject);
