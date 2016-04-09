import * as messageActions from "../actions/messages.actions";
import * as imageActions from "../actions/image.actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

var React = require('react-native');
var CreateMsg = require('../components/createMsg');
var Routes = require('../config/routes');
var {Navigator} = React;

var CustomSceneConfig = Object.assign({},
    Navigator.SceneConfigs.FloatFromLeft, {});


class CreateMsgContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
        this._postMessage = this._postMessage.bind(this);
    }

    componentWillReceiveProps(nextProps) {m
        if (nextProps.messages.redirect && !nextProps.messages.error) {
            this.props.navigator.push({
                id: Routes.messageMap,
                sceneConfig: CustomSceneConfig
            });
        } else {
            this.setState({error: nextProps.error});
        }
    }

    _onImagePress(image) {
        this.props.openImage(image);
        this.props.navigator.push({
            id: Routes.imageDetail
        })
    }

    _postMessage(data) {
        this.props.postMessage(data);
    }

    render() {
        return (
            <CreateMsg
                post={ (data) => this._postMessage(data)}
                onImagePress={ (data) => this._onImagePress(data)}
                navigator={this.props.navigator}
                location={this.props.route.props.position}
                user={this.props.user}
                error={this.state.error}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        messages: store.messages,
        user: store.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        postMessage: bindActionCreators(messageActions.postMessage, dispatch),
        openImage: bindActionCreators(imageActions.imageOpen, dispatch)
    };
};

CreateMsgContainer = connect(mapStateToProps, mapDispatchToProps)(CreateMsgContainer);


module.exports = CreateMsgContainer;
