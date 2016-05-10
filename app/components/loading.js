var React = require('react-native');
var s = require("../styles/style");
var {
    Text,
    View,
    } = React;

class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.mainContainer}>
                <Text>
                    Loading...
                </Text>
            </View>
        );
    }
}

module.exports = Loading;