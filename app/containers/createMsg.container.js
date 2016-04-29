import * as messageActions from "../actions/messages.actions";
import * as imageActions from "../actions/image.actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

var React = require('react-native');
var CreateMsg = require('../components/createMsg');
var Routes = require('../config/routes');
var {Navigator} = React;

class CreateMsgContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            chosen_object: null
        };
        this._postMessage = this._postMessage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.messages.error) {
            this.setState({error: nextProps.error});
        }
        if (nextProps.gallery.hasOwnProperty('chosen_object')) {
            this.setState({chosen_object: nextProps.gallery.chosen_object});
        }
    }

    _addObject() {
        this.props.navigator.push({
            id: Routes.objectGallery
        });

    }

    _onImagePress(image) {
        this.props.openImage(image);
        this.props.navigator.push({
            id: Routes.imageDetail
        })
    }

    _postMessage(data) {
        data['loc'] = {
            coordinates: [
                this.props.location.longitude,
                this.props.location.latitude
            ]
        };
        data['user']= {
            id:this.props.user._id,
            username: this.props.user.username
        };
        this.props.postMessage(data);
        this.props.navigator.pop();
    }

    render() {
        return (
            <CreateMsg
                post={ (data) => this._postMessage(data)}
                onImagePress={ (data) => this._onImagePress(data)}
                onAddObject={ () => this._addObject()}
                chosen_object={this.state.chosen_object}
                navigator={this.props.navigator}
                error={this.state.error}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        messages: store.messages,
        gallery: store.gallery,
        user: store.user.user,
        location: store.location
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
