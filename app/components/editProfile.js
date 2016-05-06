var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    TextInput,
    } = React;

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
    formInput: {
        height: 36,
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
        flex: 1,
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
        width: 100,
        flex: 1,
        backgroundColor: "#555555",
        borderColor: "#555555",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    }
});
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var options = {
    title: null, // specify null or empty string to remove the title
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
    chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
    cameraType: 'back', // 'front' or 'back'
    mediaType: 'photo', // 'photo' or 'video'
    maxWidth: 500, // photos only
    maxHeight: 800, // photos only
    quality: 1, // 0 to 1, photos only
    allowsEditing: true, // Built in functionality to resize/reposition the image after selection
    noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
    storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
        skipBackup: true, // ios only - image will NOT be backed up to icloud
        path: 'images' // ios only - will save image at /Documents/images rather than the root
    }
};


class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.username,
            image: this.props.user.file,
            gender: this.props.user.gender,
            email: this.props.user.email,
            password: ''
        };
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
    _saveUser(){

    }
    _addImage() {
        ImagePickerManager.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // uri (on iOS)
                // const source = {uri: response.uri.replace('file://', ''), isStatic: true};

                this.setState({
                    image: {data: 'data:image/jpeg;base64,' + response.data}
                });
            }
        });
    }
    renderScene(route, navigator) {
        var source = '';
        if(this.state.image != undefined){
            source = {uri: this.state.image.data};
        } else {
            source =require('../../public/user.png');
        }
        return (
            <View style={styles.mainContainer}>

                <Image style={styles.picture} source={source}/>
                <TouchableHighlight onPress={() => this._addImage()} style={styles.button}>
                    <Text style={styles.buttonText}>Add Image</Text>
                </TouchableHighlight>

                <TextInput
                    style={styles.formInput}
                    value={this.state.username}
                    onChange={(event) => this.setState({username: event.nativeEvent.text})}
                />
                <TextInput
                    style={styles.formInput}
                    value={this.state.email}
                    onChange={(event) => this.setState({email: event.nativeEvent.text})}
                />
                <TextInput
                    style={styles.formInput}
                    secureTextEntry={true}
                    value={'your password'}
                    onChange={(event) => this.setState({password: event.nativeEvent.text})}
                />
                <TouchableHighlight onPress={(this._saveUser.bind(this))} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
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
                    Cancel
                </Text>
            </TouchableOpacity>
        );
    },
    RightButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                onPress={() => navigator.parentNavigator.pop()}>
            </TouchableOpacity>
        );
    },
    Title(route, navigator, index, navState) {
        return null;
    }
};

module.exports = EditProfile;
