import {connect} from "react-redux";
import {bindActionCreators} from "redux";

var React = require('react-native');
var DateFormatting = require('../util/dateFormatting');
var {
    View,
    Text,
    StyleSheet,
    Navigator,
    TouchableOpacity
} = React;


var styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        marginTop: 65,
        alignItems: 'stretch'
    },
    message: {
        fontSize: 14,
        color: 'green'
    }
});

class MessageDetail extends React.Component {
    constructor(props) {
        super(props);
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

    renderScene(route, navigator) {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.message}>
                    {this.props.message.text}
                    {"\n"}
                </Text>
                <Text> Views: {this.props.message.views_count} </Text>
                <Text> by {this.props.message.user.username}
                    on {DateFormatting.getFormattedDateYMD(this.props.message.published_at)}</Text>

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
module.exports = MessageDetail;