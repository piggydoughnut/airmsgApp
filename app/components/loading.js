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
    messageContainer: {
        padding: 20,
        marginTop: 15,
        marginRight: 15,
        alignItems: 'stretch'
    }
});

class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>
                    Loading...
                </Text>
            </View>
        );
    }
}

module.exports = Loading;