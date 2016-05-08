var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    } = React;

var styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
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