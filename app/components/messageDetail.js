import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getFormattedDateYMD} from "../util/dateFormatting";

var React = require('react-native');
var CommentView = require('../containers/commentsView.container');
var ARView = require('../ar/arView');
var s = require('../styles/style');
var {
    ScrollView,
    Text,
    StyleSheet,
    Navigator,
    TouchableOpacity,
    TouchableHighlight,
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
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
    button: {
        height: 36,
        backgroundColor: "#555555",
        borderColor: "#555555",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    },
});

class MessageDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ar: 'off'
        }
    }

    _startAR(){
        this.setState({ar: 'on'});

    }
    render() {
        if(this.state.ar=='on'){
            return (<ARView />);
        }
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
        var msg = this.props.messageDetail.message;

        var image = msg.file ? <Image source={{uri: msg.file.data}} style={styles.image}/> : null;

        return (
            <ScrollView style={styles.mainContainer}>
                <TouchableOpacity onPress={ () => this.props.onImagePress(msg.file.data)}>
                    { image }
                </TouchableOpacity>
                <Text style={styles.message}>{msg.text}{"\n"}</Text>
                <Text> Views: {msg.views_count} </Text>
                <Text> by {msg.user.username} on {getFormattedDateYMD(msg.created_at)}</Text>
                <CommentView />

                <TouchableHighlight onPress={() => this._startAR()} style={styles.button}>
                    <Text style={styles.buttonText}>Show AR</Text>
                </TouchableHighlight>

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