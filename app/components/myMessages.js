import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Cell, Section, TableView} from "react-native-tableview-simple";

var Icon = require('react-native-vector-icons/Ionicons');
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
        padding: 0,
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
        var sectionName = "Your messages";
        return (
            <View style={styles.container}>
                <Section header={sectionName}>
                    <ScrollView style={styles.scroll}>
                        <TableView>
                            {this.props.userMessages.docs.map((message, i) => {
                                var style = '';
                                if (i % 2 == 0) {
                                    style = {backgroundColor: '#E3F4FA'}
                                }
                                return (<MessageRow row={message} rowStyle={style} key={i}/>);
                            })}
                        </TableView>
                    </ScrollView>
                </Section>
            </View>
        );
    }
}


class MessageRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var comments = '';
        if(this.props.row.new_comments_count){
            comments = '- new comments ('+ this.props.row.new_comments_count + ')';
        }
        var message = this.props.row.text.substring(0, 50) + '   ' + <Icon name="eye" size={30} color="#4F8EF7" /> + this.props.row.views_count + '  ' + comments;
        return (
            <Cell cellstyle="Subtitle" title={message}
                  detail={this.props.row.loc.city}/>
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
