'use strict';

var React = require('react-native');

var {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({

    mainContainerCenter: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    navigator: {
        backgroundColor: '#484691'
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
    formInput: {
        height: 36,
        padding: 10,
        width: 300,
        marginBottom: 5,
        marginTop: 5,
        flex: 1,
        fontSize: 18,
        borderWidth: 0.5,
        borderColor: "#555555",
        borderRadius: 8,
        color: "#555555",
        alignSelf: "center"
    },
    textInput: {
        height: 70,
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
    postInput: {
        height: 100,
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
    simpleButton: {
        width: 200,
        height: 36,
        flex: 1,
        backgroundColor: "#9090c4",
        borderColor: "#9090c4",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 40,
        justifyContent: "center"
    },
    simpleButtonStretch: {
        height: 36,
        flex: 1,
        backgroundColor: "#9090c4",
        borderColor: "#9090c4",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 20,
        justifyContent: "center"
    },
    header:{
        fontSize: 18,
        alignSelf: "center"
    },
    error: {
        fontSize: 16,
        color: 'red'
    },
    title: {
        color:'white',
        margin: 13
    },
    inline: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    center: {
        alignSelf: "center",
        justifyContent: "center",
    }
});
