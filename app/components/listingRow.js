var React = require('react-native');
var {
    StyleSheet,
    Text,
    View
} = React;

var styles = StyleSheet.create({
    item: {
        borderBottomWidth: 5,
        borderBottomColor: 'black'
    }
});

class ListingRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={this.props.rowStyle}>
                <Text style={styles.item} key={this.props.key}>{this.props.row.text.substring(0, 20)} ...</Text>
                <Text>{this.props.row.location.city} - {this.props.row.location.country}</Text>
            </View>
        );
    }

}

module.exports = ListingRow;
