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

class Marker extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.messageContainer}>
                <Text>
                    { this.props.message }
                </Text>
                <Text>
                    see more ...
                </Text>
            </View>
        );
    }
}

module.exports = Marker;