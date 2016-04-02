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

var Routes = require('../config/routes');

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
var CreateMsg = require('./createMsg.container');
var MessageMap = require('./messageMap.container');

var Profile = require('./profile.container');
var EditProfile = require('../pages/editProfile');

var MyMessages = require('../pages/myMessages');
var MainContainer = require('./main.container');

class Root extends Component {

    renderScene(route, navigator) {
        var routeId = route.id;
        switch (routeId) {
            case Routes.mainContainer:
                return (<MainContainer navigator={navigator}/>);
            case Routes.createMsg:
                return (<CreateMsg navigator={navigator} route={route}/>);
            case Routes.messageMap:
                return (<MessageMap navigator={navigator}/>);
            case Routes.profile:
                return (<Profile navigator={navigator}/>);
            case Routes.editProfile:
                return (<EditProfile navigator={navigator}/>);
            case Routes.messages:
                return (<MyMessages navigator={navigator}/>);
        }
        return this.noRoute(navigator);
    }

    noRoute(navigator) {
        return (
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => navigator.pop()}>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>No such route</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: Routes.messageMap }}
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

module.exports = Root;

