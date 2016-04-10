import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getFormattedDateYMDHM} from "../util/dateFormatting";

var React = require('react-native');
var {
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    Text,
    ListView
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
    button: {
        width: 200,
        height: 36,
        flex: 1,
        backgroundColor: "#555555",
        borderColor: "#555555",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
    comment: {
        paddingTop: 20
    },
    commentSignature: {
        fontSize: 10
    }
m
});

class CommentView extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.comments)
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.comments),
        });
    }

    _sendComment() {
        this.props.sendComment(this.state.comment);
        this._clearInput();
        this.props.getComments(this.props.msgId);
    }

    _clearInput() {
        this._textInput.setNativeProps({text: ''});
        this.setState({comment: ''});
    }

    renderRow(rowData, sectionId, rowId) {
        var color = rowId % 2 == 0 ? '#E3F4FA' : 'white';
        return (
            <Comment
                key={rowId}
                comment={rowData}
                style={styles.comment}
            />
        );
    }

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />

                <TextInput
                    ref={component => this._textInput = component}
                    multiline={true}
                    placeholder="Comment"
                    onChange={(event) => this.setState({comment: event.nativeEvent.text})}
                    style={styles.formInput}
                />
                <Text> {this.state.comment}</Text>
                <TouchableHighlight style={styles.button} onPress={() => this._sendComment()}>
                    <Text style={styles.buttonText}>Post</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={this.props.style}>
                <Text key={this.props.key}>{this.props.comment.description} </Text>
                <Text style={styles.commentSignature}>by {this.props.comment.user.username}
                    on {getFormattedDateYMDHM(this.props.comment.published_at)}</Text>
            </View>
        );
    }
}

module.exports = CommentView;
