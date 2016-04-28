var React = require('react-native');
var api = require('../config/api');
var s = require('../styles/style');

var {
    StyleSheet,
    View,
    ListView,
    Text,
    Image,
    Navigator,
    TouchableOpacity,
    TouchableHighlight
} = React;

var styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    list: {
        marginTop: 65,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    row: {
        justifyContent: 'center',
        padding: 5,
        margin: 10,
        marginBottom: 5,
        width: 150,
        height: 150,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC'
    },
    thumb: {
        width: 100,
        height: 100
    },
    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    },
    button: {
        width: 80,
        height: 36,
        flex: 1,
        backgroundColor: "#90C3D4",
        borderColor: "#555555",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    },
    buttonText: {
        color: "#ffffff",
        alignSelf: "center"
    }
});

class ObjectGallery extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.data.docs),
            pressedThumbId: null
        };
        this._renderRow = this._renderRow.bind(this);

    }

    pressedThumb(obj){
        this.props.chooseGalleryObject(obj);
        this.props.navigator.pop();
    }

    _renderRow(rowData, sectionId, rowId) {
        return (
            <Thumb
                data={rowData}
                rowId={rowId}
                pressedThumb={(id) => {this.pressedThumb(id)}}
            />
        )
    }

    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
                    <Navigator.NavigationBar style={s.navigator}
                        routeMapper={NavigationBarRouteMapper} />
                    }
            />

        );
    }

    renderScene() {
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

class Thumb extends React.Component {
    constructor(props) {
        super(props);
    }

    pressRow() {
        this.props.pressedThumb(this.props.data);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.pressRow()}>
                    <View style={styles.row}>
                        <Image style={styles.thumb}
                               source={{uri: api.domain + this.props.data.thumb_file_path}}/>
                        <Text>{this.props.data.filename}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.buttonText}>Preview</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                              onPress={() => navigator.parentNavigator.pop()}>
                <Text style={{color: 'white', margin: 10}}>
                    Back
                </Text>
            </TouchableOpacity>
        );
    },
    RightButton(route, navigator, index, navState) {
        return null;
    },
    Title(route, navigator, index, navState) {
        return null;
    }
};

module.exports = ObjectGallery;