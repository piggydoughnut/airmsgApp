import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getFormattedDateYMD} from "../util/dateFormatting";

var React = require('react-native');
var CommentView = require('../containers/commentsView.container');
var ARView = require('../ar/arView');
var s = require('../styles/style');
var {
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Image,
} = React;


var styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        marginTop: 65,
    },
    message: {
        fontSize: 16,
        color: 'black'
    },
    image: {
        width: 250,
        height: 250,
        margin: 10,
        alignSelf: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
    objectButton: {
        height: 36,
        backgroundColor: "#02a3ae",
        borderColor: "#02a3ae",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center"
    },
    inline: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    signature:{
        alignSelf: "center",
        justifyContent: "center",
        fontWeight: 'bold'
    }
});

class MessageDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ar: 'off'
        }
    }

    _startAR() {
        this.setState({ar: 'on'});

    }

    render() {
        if (this.state.ar == 'on') {
            return (<ARView objSrc={this.props.messageDetail.message.obj.obj_file_path} />);
        }
        var msg = this.props.messageDetail.message;
        var objectButton = null;
        if (msg.object) {
            objectButton =
                <TouchableHighlight onPress={() => this._startAR()} style={styles.objectButton}>
                    <Text style={styles.buttonText}>see object</Text>
                </TouchableHighlight>
        }

        var image = msg.file ? <Image source={{uri: msg.file.data}} style={styles.image}/> : null;

        return (
            <ScrollView style={styles.mainContainer}>
                <TouchableOpacity onPress={ () => this.props.onImagePress(msg.file.data)}>
                    { image }
                </TouchableOpacity>
                <Text style={styles.signature}> {msg.user.username} on {getFormattedDateYMD(msg.created_at)} {"\n"}</Text>

                <Text style={styles.message}>{msg.text}{"\n"}</Text>


                { objectButton }

                <CommentView />

            </ScrollView>
        );
    }
}
module.exports = MessageDetail;
