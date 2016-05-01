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
            comments: this.props.messageDetail.comments,
            error: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.messageDetail.comments !== undefined &&
            nextProps.messageDetail.comments.hasOwnProperty('docs') &&
            nextProps.messageDetail.comments.docs.length != this.state.comments.length) {
            this.setState({
                comments: nextProps.messageDetail.comments,
                error: null
            });
        }
        if(nextProps.comments !== undefined &&
            nextProps.comments.hasOwnProperty('error')){
            this.setState({error:nextProps.comments.error});
        }
    }

    _onSendCommentPress(comment) {
        var data = {
            parent: this.props.messageDetail.message._id,
            user: {
                id: this.props.user._id,
                username: this.props.user.username
            },
            text: comment
        };
        this.props.postComment(data, this.props.token, COMMENT_POST);
    }

    _getComments(id){
        this.props.getComments(id, this.props.token);
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
                comments={this.state.comments}
                sendComment={ (comment) => this._onSendCommentPress(comment)}
                // getComments={ (id) => this._getComments(id)}
                msgId={this.props.messageDetail.message._id}
            />
        );
    }
}
const mapStateToProps = (store) => {
    return {
        messageDetail: store.messages.messageDetail,
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