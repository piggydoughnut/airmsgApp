import {connect} from "react-redux";
import {bindActionCreators} from "redux";

var React = require('react-native');
var CommentView = require('../components/commentView');
var {Navigator} = React;

class CommentViewContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CommentView />
        );
    }
}

const mapStateToProps = (store) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

CommentViewContainer = connect(mapStateToProps, mapDispatchToProps)(CommentViewContainer);


module.exports = CreateMsgContainer;
