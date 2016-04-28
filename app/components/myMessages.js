import {connect} from "react-redux";
import {bindActionCreators} from "redux";
var React = require('react-native');
var s = require('../styles/style');

var {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Navigator,
    TouchableOpacity
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        alignItems: 'stretch'
    },
    item: {
        borderBottomWidth: 5,
        borderBottomColor: 'black'
    },
});

class MyMessages extends React.Component {

    constructor(props) {
        super(props);
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

    renderScene(route, navigator) {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    {this.props.userMessages.map((message, i) => {
                        var style = '';
                        if (i % 2 == 0) {
                            style = {backgroundColor: '#E3F4FA'}
                        }

                        return (<MessageRow row={message} rowStyle={style} key={i}/>);
                    })}
                </ScrollView>
            </View>
        );
    }

}


class MessageRow extends React.Component {

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

module.exports = MyMessages;
