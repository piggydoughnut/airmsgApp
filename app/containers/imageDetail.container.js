import {connect} from "react-redux";

var React = require('react-native');
var Navigation = require('../components/navigation');
var ImageDetail = require('../components/imageDetail');

class ImageDetailContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var component =
            <ImageDetail
                image={this.props.image}
                navigator={this.props.navigator}
            />;
        var conf = {title: 'Detail'};
        return (
            <Navigation
                component={component}
                navigator={this.props.navigator}
                conf={conf}
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