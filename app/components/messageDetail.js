import {connect} from "react-redux";
import {bindActionCreators} from "redux";

var React = require('react-native');
var DateFormatting = require('../util/dateFormatting');
var CommentView = require('./commentView');
var {
    ScrollView,
    Text,
    StyleSheet,
    Navigator,
    TouchableOpacity,
    TextInput,
    Image
} = React;


var styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        marginTop: 65,
    },
    message: {
        fontSize: 14,
        color: 'green'
    },
    image: {
        width: 250,
        height: 250,
        margin: 10,
    },
    formInput: {
        height: 150,
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 15,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#555555",
        borderRadius: 8,
        color: "#555555"
    },

});

class MessageDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentsNumber: 0
        }
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
        var commentStyle= '';
        var comments = '';
        if(this.state.commentsNumber == 0){
            comments =
                <CommentView>

                </CommentView>
        }
        var msg = this.props.messageDetail.message;

        var image = msg.file ? <Image source={{uri: msg.file.data}} style={styles.image}/> : null;
        return (
            <ScrollView style={styles.mainContainer}>
                <TouchableOpacity onPress={ () => this.props.onImagePress(msg.file.data)}>
                    { image }
                </TouchableOpacity>
                <Text style={styles.message}>
                    {msg.text}
                    {"\n"}
                </Text>
                <Text> Views: {msg.views_count} </Text>
                <Text> by {msg.username} on {DateFormatting.getFormattedDateYMD(msg.published_at)}</Text>
                <TouchableOpacity>
                    <Text style={commentStyle}> Comments {this.state.commentsNumber} </Text>
                </TouchableOpacity>
                <TextInput
                    multiline={true}
                    placeholder="Comment"
                    style={styles.formInput}
                />

            </ScrollView>
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