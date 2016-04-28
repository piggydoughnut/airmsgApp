import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as galleryActions from "../actions/gallery.actions";

var React = require('react-native');
var ObjectGallery = require('../components/objectGallery');

class ObjectGalleryContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
        this.props.getUserGallery();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        // this.setState({data:})
    }

    render() {
        return (
            <ObjectGallery
                data={this.state.data}
            />
        );
    }

}

const mapStateToProps = (store) => {
    return {
        gallery: store.gallery
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserGallery: bindActionCreators(galleryActions.getGalleryForUser, dispatch)
    };
};

ObjectGalleryContainer = connect(mapStateToProps, mapDispatchToProps)(ObjectGalleryContainer);


module.exports = ObjectGalleryContainer;

