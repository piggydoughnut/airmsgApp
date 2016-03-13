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
    Navigator,
    AlertIOS,
    TouchableOpacity
    } from 'react-native';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111'
    },
    textStyle: {
        flex: 2,
        fontSize: 20,
        margin: 20
    }
});

/** Pages for navigation **/
var Login = require('./app/pages/login');
var CreateMsg = require('./app/pages/createMsg');
var MessageMap = require('./app/pages/messageMap');
var Main = require('./app/pages/main');

class AirMsgProject extends Component {

    renderScene(route, navigator) {
        var routeId = route.id;
        console.log(routeId);
        switch (routeId) {
            case 'Main':
                return (<Main navigator={navigator}/>);
            case 'LoginPage':
                return (<Login navigator={navigator}/>);
            case 'CreateMsg':
                return (<CreateMsg navigator={navigator}/>);
            case 'MessageMap':
                return (<MessageMap navigator={navigator}/>);
        }
        return this.noRoute(navigator);
    }

    noRoute(navigator) {
        return (
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => navigator.pop()}>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>请在 index.js 的 renderScene 中配置这个页面的路由</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'Main', name: 'Main'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.PushFromRight;
                }}
            />
        );
    }
}


AppRegistry.registerComponent('AirMsgProject', () => AirMsgProject);
