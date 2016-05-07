var React = require('react-native');
var DateFormatter = require('../util/dateFormatting');

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
    },
    button: {
        height: 36,
        width: 140,
        backgroundColor: "#9090c4",
        borderColor: "#9090c4",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
});

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            image: this.props.user.file
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
        var source = '';
        if(this.state.image != undefined){
            source = {uri: this.state.image.data};
        } else {
            source =require('../../public/user.png');
        }

        return (
            <View style={styles.mainContainer}>

                <Image style={styles.picture} source={source}/>

                <Text style={styles.info}> { this.props.user.username } </Text>
                <Text style={styles.info}> { this.props.user.email } </Text>
                <Text style={styles.info}> { this.props.user.country } </Text>

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
