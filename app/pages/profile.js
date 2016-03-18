var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var {
    Appregistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    } = React;

var styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    picture: {
        width: 250,
        height: 250
    },
    info: {
        fontSize: 20,
        padding: 10,
        color: "black"
    },
    rightIcon: {
        paddingRight: 10
    }
});

class Profile extends React.Component {
    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
                    <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                        routeMapper={NavigationBarRouteMapper} />
                    }
            />

        );
    }

    renderScene(route, navigator) {
        return (
            <View style={styles.mainContainer}>
                <Image
                    style={styles.picture}
                    source={require('../../public/img/profile.jpg')}
                />
                <Icon name="male" size={30} color="#4f8ef7" style={styles.info} >
                    <Text style={styles.info}> Michael </Text>
                </Icon>
                <Text style={styles.info}> France </Text>

                <Text style={styles.info}> 20.5.2000 </Text>

            </View>
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
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                onPress={() => navigator.parentNavigator.pop()}>
                <Icon name="edit" color="white" size={20} style={styles.rightIcon}/>
            </TouchableOpacity>
        );
    },
    Title(route, navigator, index, navState) {
        return null;
    }
};

module.exports = Profile;
