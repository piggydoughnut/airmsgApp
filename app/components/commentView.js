import {connect} from "react-redux";
import {bindActionCreators} from "redux";

var React = require('react-native');
var {
    ScrollView,
    StyleSheet,
    TextInput,
} = React;


var styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        marginTop: 65,
    },
    message: {
        fontSize: 14,
        color: 'green'
    },
    formInput: {
        height: 150,
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 15,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#555555",
        borderRadius: 8,
        color: "#555555"
    },

});

class MessageDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentsNumber: 0
        }
    }

    render() {
        return (
            <TextInput
                multiline={true}
                placeholder="Comment"
                style={styles.formInput}
            />
        );
    }
}

module.exports = MessageDetail;