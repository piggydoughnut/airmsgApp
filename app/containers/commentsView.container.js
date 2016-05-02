import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as commentsActions from "../actions/comments.actions";
import {COMMENT_POST} from "../actions/comments.actions";

var React = require('react-native');
var CommentView = require('../components/commentView');

class CommentViewContainer extends React.Component {
    constructor(props) {
        super(props);
        var detail = this.props.messageDetail;
        if (detail == undefined && this.props.messageDetailPersonal !== undefined) {
            detail = this.props.messageDetailPersonal;
        }
        this.state = {
            comments: detail.comments,
            error: null,
            detail: detail
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (this.state.detail !== undefined &&
            this.state.detail.comments !== undefined &&
            this.state.detail.comments.hasOwnProperty('docs') &&
            this.state.detail.comments.docs.length != this.state.comments.length) {
            this.setState({
                comments: this.state.detail.comments,
                error: null
            });
        }
        if (nextProps.comments !== undefined &&
            nextProps.comments.hasOwnProperty('error')) {
            this.setState({error: nextProps.comments.error});
        }
    }

    _onSendCommentPress(comment) {
        var data = {
            parent: this.state.detail.message._id,
            user: {
                id: this.props.user._id,
                username: this.props.user.username
            },
            text: comment
        };
        this.props.postComment(data, this.props.token, COMMENT_POST);
    }

    _getComments(page) {
        this.props.getComments(this.state.detail.message._id, this.props.token, page);
    }

    render() {
        if (this.state.error) {
            React.AlertIOS.alert(
                'Error',
                this.state.error
            );
        }
        return (
            <CommentView
                comments={this.state.detail.comments}
                sendComment={ (comment) => this._onSendCommentPress(comment)}
                getComments={ (page) => this._getComments(page)}
                msgId={this.state.detail.message._id}
            />
        );
    }
}
const mapStateToProps = (store) => {
    return {
        messageDetail: store.messages.messageDetail,
        messageDetailPersonal: store.user.messageDetail,
        comments: store.comments,
        token: store.user.tokenInfo.access_token,
        user: store.user.user
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