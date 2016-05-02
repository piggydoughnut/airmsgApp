import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as imageActions from "../actions/image.actions";
import * as messageActions from "../actions/messages.actions";

var React = require('react-native');
var MessageDetail = require('../components/messageDetail');
var Routes = require('../config/routes');

class MessageDetailContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    _onImagePress(image) {
        this.props.openImage(image);
        this.props.navigator.push({
            id: Routes.imageDetail
        })
    }

    componentWillUnmount() {
        if(this.props.messageDetail !== undefined){
            this.props.messageClose();
        }
        if(this.props.messageDetailPersonal !== undefined){
            this.props.messageClosePersonal();
        }
    }

    render() {
        var detail = this.props.messageDetailPersonal;
        if (detail === undefined) {
            detail = this.props.messageDetail;
        }
        console.log(detail);
        return (
            <MessageDetail
                messageDetail={detail}
                navigator={this.props.navigator}
                onImagePress={ (img) => this._onImagePress(img)}
            />
        );
    }
}
const mapStateToProps = (store) => {
    return {
        messageDetail: store.messages.messageDetail,
        messageDetailPersonal: store.user.messageDetail
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openImage: bindActionCreators(imageActions.imageOpen, dispatch),
        messageClose: bindActionCreators(messageActions.closeMessage, dispatch),
        messageClosePersonal: bindActionCreators(messageActions.closeMessagePersonal, dispatch)
    };
};

MessageDetailContainer = connect(mapStateToProps, mapDispatchToProps)(MessageDetailContainer);

module.exports = MessageDetailContainer;