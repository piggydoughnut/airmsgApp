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

    constructor(props) {
        super(props);
        this._getUser = this._getUser.bind(this);
        this.state = {
            user: null
        };
    }

    componentDidMount() {
        this._getUser();
    }

    _getUser() {
        fetch("http://localhost:3000/users/56ebe2c5871fc6eb9cd08bcc",
            {method: "GET"})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    user: responseData.user
                });
            })
            .done();
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
        if (!this.state.user) {
            return this.renderLoadingView();
        }
        user = this.state.user;

        return (
            <View style={styles.mainContainer}>
                <Image
                    style={styles.picture}
                    source={require('../../public/img/profile.jpg')}
                />

                <Icon name={this.state.user.gender} size={30} color="#4f8ef7" style={styles.info} >
                    <Text style={styles.info}> { this.state.user.username } </Text>
                </Icon>

                <Text style={styles.info}> { this.state.user.birthday } </Text>

            </View>
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.mainContainer}>
                <Text>
                    Loading user...
                </Text>
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
                <Icon name="edit" color="white" size={20} style={styles.rightIcon}/>
            </TouchableOpacity>
        );
    },
    Title(route, navigator, index, navState) {
        return null;
    }
};

module.exports = Profile;
