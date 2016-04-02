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
    mainContainer: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    }
});

class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>
                    { this.props.error }
                </Text>
            </View>
        );
    }
}

module.exports = Error;