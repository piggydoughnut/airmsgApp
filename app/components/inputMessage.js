var React = require('react-native');
var s = require("../styles/style");
var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    SliderIOS,
    Image,
    ScrollView,
} = React;

var styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        margin: 10,
    },
    error: {
        color: 'red'
    },
    picture: {
        width: 200,
        height: 180
    },
    camera: {
        margin: 20,
        alignItems: 'center'
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


class InputMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            value: 1,
            image: '',
            textValidation: ''
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
                // const source = {uri: response.uri.replace('file://', ''), isStatic: true};

                this.setState({
                    image: {data: 'data:image/jpeg;base64,' + response.data}
                });
            }
        });
    }

    _onPress() {
        if (this.state.message === '') {
            this.setState({textValidation: 'Did you forget to write a message?'});
            return;
        }
        var data = {
            validity: this.state.value,
            text: this.state.message,
            file: {
                data: this.state.image.data
            }
        };
        this.props.postMessage(data);
    }

    render() {
        var source = (this.state.image != '') ? {uri: this.state.image.data} : require('../../public/camera.png');
        return (
            <ScrollView>
                <Text style={styles.error}>{ this.state.textValidation }</Text>
                <TextInput
                    multiline={true}
                    required={true}
                    placeholder="your message..."
                    onChange={(event) => this.setState({message: event.nativeEvent.text})}
                    style={s.postInput}
                    value={this.state.message}/>

                <TouchableOpacity onPress={() => this._addImage()} style={styles.camera}>
                    <Image style={styles.picture} className="image" source={source}/>
                </TouchableOpacity>

                <Text> Validity of your message in days: </Text>
                <SliderIOS
                    maximumValue={365}
                    step={1}
                    value={this.state.value}
                    onValueChange={(value) => this.setState({value: value})}/>
                <Text> {this.state.value} </Text>
                    <TouchableHighlight onPress={() => this._onPress()} style={s.simpleButtonStretch}>
                        <Text style={s.buttonText}>Save</Text>
                    </TouchableHighlight>
            </ScrollView>
        );
    }
}

module.exports = InputMessage;