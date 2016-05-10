var React = require('react-native');
var s =require("../styles/style");
var {
    Text,
    View,
    } = React;

class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={s.mainContainerCenter}>
                <Text>
                    { this.props.error }
                </Text>
            </View>
        );
    }
}

module.exports = Error;