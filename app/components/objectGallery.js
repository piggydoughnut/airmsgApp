var React = require('react-native');
var api = require('../config/api');

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
            dataSource: ds.cloneWithRows(this.props.data.docs)
        };
        // this._pressRow = this._pressRow.bind(this);

    }

    _renderRow(rowData, sectionId, rowId) {
        console.log(rowData);
        return (
            <Thumb
                data={rowData}
                rowId={rowId}
            />
        )
    }

    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
                    <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
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
        this.state = {
            id: this.props.rowId,
            pressed: false
        }

    }

    pressRow() {
        console.log('pressed');
        if (this.state.pressed) {
            this.setState({pressed: false});
        } else {
            this.setState({pressed: true});
        }
    }

    render() {
        var style = "";
        if (this.state.pressed) {
            style = {backgroundColor: 'pink'};
        }
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.pressRow()} style={style}>
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