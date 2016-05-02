import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Cell, Section, TableView} from "react-native-tableview-simple";
var RefreshInfiniteListView = require('@remobile/react-native-refresh-infinite-listview');

var Icon = require('react-native-vector-icons/Ionicons');
var React = require('react-native');
var s = require('../styles/style');

var {
    StyleSheet,
    Text,
    ScrollView,
    ListView,
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
    separator: {
        height: 1,
        backgroundColor: '#CCC'
    },
});

class MyMessages extends React.Component {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    constructor(props) {
        super(props);
        console.log(this.props.userMessages);
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.userMessages.docs),
            userMessages: this.props.userMessages,
            page: 1
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('component will receive props');
        if (nextProps.userMessages !== undefined) {
            this.setState({
                dataSource: this.ds.cloneWithRows(nextProps.userMessages.docs),
                loading: false
            });
        }
    }

    onRefresh() {
        this.props.loadUserMessages(1);
        this.list.hideHeader();
        this.setState({page: 1});
    }

    onInfinite(page) {
        this.props.loadUserMessages(this.state.page + 1);
        this.list.hideFooter();
        this.setState({page: this.state.page + 1});
    }

    loadedAllData() {
        return (this.state.userMessages.docs.length == this.state.userMessages.total) || (this.state.userMessages.total <= 10 );
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

    renderRow(message) {
        return <MessageRow
            row={message}
            key={message._id}
            showDetail={(msg) => this.props.showDetail(msg)}
        />;
    }

    renderSeparator(sectionID, rowID) {
        return (
            <View style={styles.separator} key={sectionID+rowID}/>
        );
    }

    renderScene(route, navigator) {
        var sectionName = "Your messages";
        return (
            <View style={styles.container}>
                <Section header={sectionName}>
                    <RefreshInfiniteListView
                        ref={(list) => {this.list = list}}
                        dataSource={this.state.dataSource}
                        renderRow={(message) => this.renderRow(message)}
                        renderSeparator={(secId, rowId) => this.renderSeparator(secId, rowId)}
                        loadedAllData={() => this.loadedAllData()}
                        initialiListSize={10}
                        scrollEventThrottle={10}
                        style={{backgroundColor: 'transparent'}}
                        onRefresh={() => this.onRefresh()}
                        onInfinite={() => this.onInfinite()}
                    >
                    </RefreshInfiniteListView>

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
        if (this.props.row.new_comments_count) {
            comments = '- new comments (' + this.props.row.new_comments_count + ')';
        }
        var message = this.props.row.text.substring(0, 30) + '...   ' +
            <Icon name="eye" size={30} color="#4F8EF7"/> + this.props.row.views_count + '  ' + comments;
        return (
            <TouchableOpacity onPress={(msg) => this.props.showDetail(this.props.row)}>
                <Cell cellstyle="Subtitle" title={message}
                      detail={this.props.row.loc.city}/>
            </TouchableOpacity>
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
