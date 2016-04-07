import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageActions from '../actions/messages.actions';

var React = require('react-native');

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
        alignItems: 'center'
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
                <Text> {this.props.message.user.username} </Text>
                <Text> {this.props.message.text} </Text>
                <Text> {this.props.message.published_at} </Text>
                <Text> {this.props.message.views_count} </Text>

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