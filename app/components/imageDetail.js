var React = require('react-native');
var {
    StyleSheet,
    Image,
} = React;

var styles = StyleSheet.create({
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        resizeMode: Image.resizeMode.contain,
        width: null,
        height: null
    }
});

class ImageDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image source={{uri: this.props.image}} style={styles.image}/>
        );
    }
}

module.exports = ImageDetail;