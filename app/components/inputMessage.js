var React = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    SliderIOS,
    Image,
    ScrollView,
} = React;

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 0,
        marginTop: 30,
        alignItems: 'center'
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
    image: {
        width: 100,
        height: 100,
        margin: 10,
    },
});
var ImagePickerManager = require('NativeModules').ImagePickerManager;

var options = {
    title: null, // specify null or empty string to remove the title
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
    chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
    cameraType: 'back', // 'front' or 'back'
    mediaType: 'photo', // 'photo' or 'video'
    // maxWidth: 100, // photos only
    // maxHeight: 100, // photos only
    quality: 0.8, // 0 to 1, photos only
    allowsEditing: false, // Built in functionality to resize/reposition the image after selection
    noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
    storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
        skipBackup: true, // ios only - image will NOT be backed up to icloud
        path: 'images' // ios only - will save image at /Documents/images rather than the root
    }
};


class InputMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            value: 0,
            image: ''
        };
    }

    componentDidMount() {
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
                const source = {uri: response.uri.replace('file://', ''), isStatic: true};

                this.setState({
                    image: source
                });
            }
        });
    }

    _onPress() {
        var data = {
            validity: this.state.value,
            text: this.state.message,
            location: this.props.location,
            user: {
                id: this.props.user._id,
                username: this.props.user.username
            },
            file: this.state.image
        };
        this.props.postMessage(data);
    }

    render() {
        var image = (this.state.image != '') ? <Image source={this.state.image} style={styles.image}/> : null;
        return (
            <ScrollView style={styles.messageContainer}>
                <TextInput
                    multiline={true}
                    required={true}
                    placeholder="INPUT MESSAGE"
                    onChange={(event) => this.setState({message: event.nativeEvent.text})}
                    style={styles.formInput}
                    value={this.state.message}/>
                <Text> Validity of your message in hours: </Text>
                <SliderIOS
                    maximumValue={10}
                    step={1}
                    onValueChange={(value) => this.setState({value: value})}/>
                <Text> {this.state.value} </Text>
                <TouchableHighlight onPress={() => this._addImage()} style={styles.button}>
                    <Text style={styles.buttonText}>Add Image</Text>
                </TouchableHighlight>

                { image }

                <TouchableHighlight onPress={() => this._onPress()} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

module.exports = InputMessage;