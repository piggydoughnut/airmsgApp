import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {COMMENT_POST} from "../actions/comments.actions";
import * as commentsActions from "../actions/comments.actions";

var React = require('react-native');
var CommentView = require('../components/commentView');

class CommentViewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.messageDetail.comments
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            comments: nextProps.comments
        });
    }

    _onSendCommentPress(comment) {
        var data = {
            parent: this.props.messageDetail.message._id,
            user: this.props.messageDetail.message.user,
            text: comment
        };
        this.props.postComment(data, this.props.token.access_token, COMMENT_POST);
    }

    _getComments(id){
        this.props.getComments(id, this.props.token.access_token);
    }

    render() {
        return (
            <CommentView
                comments={this.state.comments}
                sendComment={ (comment) => this._onSendCommentPress(comment)}
                getComments={ (id) => this._getComments(id)}
                msgId={this.props.messageDetail.message._id}
            />
        );
    }
}
const mapStateToProps = (store) => {
    return {
        messageDetail: store.messages.messageDetail,
        comments: store.comments,
        token: store.user.tokenInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getComments: bindActionCreators(commentsActions.getComments, dispatch),
        postComment: bindActionCreators(commentsActions.post, dispatch)
    };
};

CommentViewContainer = connect(mapStateToProps, mapDispatchToProps)(CommentViewContainer);

module.exports = CommentViewContainer;