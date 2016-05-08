var React = require('react-native');
var Loading = require('./loading');

import {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    Image,
} from 'react-native';

var styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    picture: {
        width: 250,
        height: 250
    },
    info: {
        fontSize: 20,
        padding: 10,
        color: "black"
    },
    rightIcon: {
        paddingRight: 10
    },
    button: {
        height: 36,
        width: 140,
        backgroundColor: "#9090c4",
        borderColor: "#9090c4",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
});

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            image: this.props.user.file
        }
    }


    render() {
        if (!this.props.user) {
            return <Loading />;
        }

        var source = '';
        if(this.state.image != undefined) {
            source = {uri: this.state.image.data};
        } else {
            source =require('../../public/user.png');
        }

        return (
            <View style={styles.mainContainer}>
                <Image style={styles.picture} source={source}/>
                <Text style={styles.info}>{ this.props.user.username }</Text>
                <Text style={styles.info}> { this.props.user.email } </Text>
                <Text style={styles.info}> { this.props.user.country } </Text>

            </View>
        );
    }

}
module.exports = Profile;
