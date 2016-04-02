var React = require('react-native');
//var Icon = require('react-native-vector-icons/Ionicons');

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

    constructor(props) {
        super(props);
        this._getFormattedBirthday = this._getFormattedBirthday.bind(this);
    }

    _getFormattedBirthday() {
        if (this.props.user.birthday) {
            var bd = new Date(this.props.user.birthday);
            return bd.getFullYear() + '/' + bd.getMonth() + '/' + bd.getDay();
        }
    }

    _renderLoadingView() {
        return (
            <View style={styles.mainContainer}>
                <Text>
                    Loading user...
                </Text>
            </View>
        );
    }

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
        if (!this.props.user) {
            return this._renderLoadingView();
        }

        return (
            <View style={styles.mainContainer}>
                <Image
                    style={styles.picture}
                    source={require('../../public/img/profile.jpg')}
                />

                <Text style={styles.info}> { this.props.user.username } </Text>
                <Text style={styles.info}> { this._getFormattedBirthday() } </Text>

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
                onPress={() => navigator.parentNavigator.push({id: 'EditProfile'})}>
                <Text style={{color: 'white', margin: 10}}>
                    Edit
                </Text>
            </TouchableOpacity>
        );
    },
    Title(route, navigator, index, navState) {
        return null;
    }
};

module.exports = Profile;
