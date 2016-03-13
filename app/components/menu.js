var React = require('react-native');
var {
    Appregistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    ScrollView
    } = React;

var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 150
    },
    menu_item: {
        color: 'red',
        fontWeight: '300',
        fontSize: 24
    }
});

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text
                    style={styles.menu_item}
                    onPress={ ()=>this.props.navigator.parentNavigator.push({id: 'LoginPage'})}>
                    My messages
                </Text>
                <Text
                    style={styles.menu_item}
                    onPress={ ()=>this.props.navigator.parentNavigator.push({id: 'LoginPage'})}>
                    Profile
                </Text>
                <Text
                    style={styles.menu_item}
                    onPress={ ()=>this.props.navigator.parentNavigator.push({id: 'LoginPage'})}>
                    Settings
                </Text>
                <Text
                    style={styles.menu_item}
                    onPress={ ()=>this.props.navigator.parentNavigator.push({id: 'LoginPage'})}>
                    Logout
                </Text>
            </ScrollView>
        );
    }
}

module.exports = Menu;