var React = require('react-native');
var {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} = React;

var styles = StyleSheet.create({
    messageContainer: {
        alignItems: 'stretch',
        width: 200
    },
    seeMore: {
        color: 'gray'
    }
});

class Callout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.messageContainer}>
                <Text>
                    { this.props.message.description }
                </Text>
                <TouchableOpacity onPress={ () => this.props.detailPage(this.props.message)}>

                    <Text style={styles.seeMore}>
                        see more ...
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

module.exports = Callout;