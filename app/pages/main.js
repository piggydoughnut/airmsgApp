var React = require('react-native');
var {
    Appregistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    Image
    } = React;

var styles = StyleSheet.create({
        mainContainer: {
            padding: 30,
            marginTop: 65,
            alignItems: 'center',
        },
        buttonText: {
            fontSize: 18,
            color: "#ffffff",
            alignSelf: "center"
        },
        button: {
            width: 200,
            height: 36,
            flex: 1,
            backgroundColor: "#555555",
            borderColor: "#555555",
            borderWidth: 1,
            borderRadius: 8,
            marginTop: 10,
            justifyContent: "center"
        },
        logo: {
            width: 35,
            height: 35,
            justifyContent: 'center',
        }
});

class Main extends React.Component {

    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                />
        );
    }

    _onSubmitPressed() {
        this.props.navigator.push({
            id: 'LoginPage',
            title: 'Login'
        })
    }

    renderScene(route, navigator) {
        return (
            <View style={styles.mainContainer}>
                <Image
                    style={styles.picture}
                    source={require('../../public/img/bottle-message.png')}
                />

                <TouchableHighlight onPress={(this._onSubmitPressed.bind(this))} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={(this._onSubmitPressed.bind(this))} style={styles.button}>
                    <Text style={styles.buttonText}>Be a Guest</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={(this._onSubmitPressed.bind(this))} style={styles.button}>
                    <Text style={styles.buttonText}>Login with Facebook</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = Main;
