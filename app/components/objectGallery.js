var React = require('react-native');
var {
    StyleSheet,
    View,
    ListView
} = React;

var styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    }
});

class ObjectGallery extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this._genRows({})),
        };

    }

    render() {
        return (
            // ListView wraps ScrollView and so takes on its properties.
            // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
            <ListView contentContainerStyle={styles.list}
                      dataSource={this.state.dataSource}
                      renderRow={this._renderRow}
            />
        );
    }
}

module.exports = ObjectGallery;