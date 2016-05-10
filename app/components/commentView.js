import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getFormattedDateYMDHM} from "../util/dateFormatting";

var s = require("../styles/style");
var React = require('react-native');
var {
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
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
    comment: {
        paddingTop: 20
    },
    commentSignature: {
        fontSize: 10
    },
    seeMore: {
        color: 'gray'
    },
    loadMore: {
        alignSelf: "center"
    }
});

class CommentView extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.state = {
            page: 1,
            total: this.props.comments.total,
            comments: this.props.comments,
            dataSource: ds.cloneWithRows(this.props.comments.docs)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.comments.docs),
            total: nextProps.comments.docs.length
        });
    }

    _sendComment() {
        this.props.sendComment(this.state.comment);
        this._clearInput();
    }

    _clearInput() {
        this._textInput.setNativeProps({text: ''});
        this.setState({comment: ''});
    }

    renderRow(rowData, sectionId, rowId) {
        return (
            <Comment
                key={rowId}
                comment={rowData}
                style={styles.comment}
            />
        );
    }

    _getComments() {
        this.setState({page: this.state.page + 1});
        this.props.getComments(this.state.page)
    }

    render() {
        var loadMoreLink = null;
        if (this.state.total > 10 && this.state.comments.docs.length !== this.state.total) {
            loadMoreLink =
                <TouchableOpacity style={styles.loadMore} onPress={ () => this._getComments()}>
                    <Text style={styles.seeMore}>
                        {"\n"}
                        load more
                    </Text>
                </TouchableOpacity>
        }
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
                {loadMoreLink}
                <TextInput
                    ref={component => this._textInput = component}
                    multiline={true}
                    placeholder="Write a comment"
                    onChange={(event) => this.setState({comment: event.nativeEvent.text})}
                    style={s.textInput}
                />
                <TouchableHighlight style={s.simpleButtonStretch} onPress={() => this._sendComment()}>
                    <Text style={s.buttonText}>Post</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showFull: false,
            linkText: 'see more...',
            text: this.props.comment.description
        }
    }

    showHide() {
        var show = true;
        var text = this.props.comment.text;
        var linkText = 'see less';

        if (this.state.showFull) {
            show = false;
            text = this.props.comment.description;
            linkText = 'see more...';
        }
        this.setState({
            showFull: show,
            linkText: linkText,
            text: text
        });
    }

    render() {
        var seeMoreLink = null;
        if (this.props.comment.text.length != this.props.comment.description.length) {
            seeMoreLink =
                <TouchableOpacity onPress={ () => this.showHide()}>
                    <Text style={styles.seeMore}>
                        {this.state.linkText}
                    </Text>
                </TouchableOpacity>

        }
        return (
            <View style={this.props.style}>
                <Text key={this.props.key}>{this.state.text}</Text>
                {seeMoreLink}
                <Text style={styles.commentSignature}>by {this.props.comment.user.username}
                    {" "}on {getFormattedDateYMDHM(this.props.comment.created_at)}</Text>
            </View>
        );
    }
}

module.exports = CommentView;
