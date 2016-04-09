import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as imageActions from "../actions/image.actions";

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

    render() {
        return (
            <MessageDetail
                messageDetail={this.props.messageDetail}
                navigator={this.props.navigator}
                onImagePress={ (img) => this._onImagePress(img)}
            />
        );
    }
}
const mapStateToProps = (store) => {
    return {
        messageDetail: store.messages.messageDetail
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openImage: bindActionCreators(imageActions.imageOpen, dispatch)
    };
};

MessageDetailContainer = connect(mapStateToProps, mapDispatchToProps)(MessageDetailContainer);

module.exports = MessageDetailContainer;