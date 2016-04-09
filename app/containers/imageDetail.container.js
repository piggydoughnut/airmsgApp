var React = require('react-native');
import {connect} from "react-redux";

var ImageDetail = require('../components/imageDetail');

class ImageDetailContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <ImageDetail
                image={this.props.image}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        image: store.image.image
    };
};

ImageDetailContainer = connect(mapStateToProps)(ImageDetailContainer);

module.exports = ImageDetailContainer;