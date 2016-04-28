import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as galleryActions from "../actions/gallery.actions";

var React = require('react-native');
var Loading = require('../components/loading');
var ObjectGallery = require('../components/objectGallery');
var {
    Text
} = React;

class ObjectGalleryContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
        this.props.getUserGallery(this.props.user._id);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.gallery.hasOwnProperty('gallery')){
            this.setState({data: nextProps.gallery.gallery});
        }
    }

    render() {
        if(!this.state.data){
            return (<Loading />)
        }
        return (
            <ObjectGallery
                data={this.state.data}
                chooseGalleryObject={(path) => this.props.chooseGalleryObject(path)}
                navigator={this.props.navigator}
            />
        );
    }

}

const mapStateToProps = (store) => {
    return {
        gallery: store.gallery,
        user: store.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserGallery: bindActionCreators(galleryActions.getGalleryForUser, dispatch),
        chooseGalleryObject: bindActionCreators(galleryActions.chooseGalleryObject, dispatch)
    };
};

ObjectGalleryContainer = connect(mapStateToProps, mapDispatchToProps)(ObjectGalleryContainer);


module.exports = ObjectGalleryContainer;

