var React = require('react-native');
var {
    Appregistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    ScrollView
    } = React;
var Routes = require('../config/routes');

var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 150
    },
    menu_item: {
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
                    onPress={ ()=>this.props.navigator.push({id: Routes.messages})}>
                    My messages
                </Text>
                <Text
                    style={styles.menu_item}
                    onPress={ ()=>this.props.navigator.push({id: Routes.profile})}>
                    Profile
                </Text>
                <Text
                    style={styles.menu_item}
                    onPress={ ()=>this.props.navigator.push({id: Routes.settings})}>
                    Settings
                </Text>
                <Text
                    style={styles.menu_item}
                    onPress={ ()=>this.props.navigator.push({id: Routes.login})}>
                    Logout
                </Text>
            </ScrollView>
        );
    }
}

module.exports = Menu;