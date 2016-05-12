var React = require('react-native');
var AutoComplete = require('react-native-autocomplete');
var Countries = require('../../public/countries.json');
import {validateEmail} from "../util/validation";
var s = require('../styles/style');

var {
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    Image,
    TextInput,
} = React;

var styles = StyleSheet.create({
    picture: {
        width: 250,
        height: 250,
        marginBottom: 20
    },
    info: {
        fontSize: 20,
        padding: 10,
        color: "black"
    },
    rightIcon: {
        paddingRight: 10
    },
    autocomplete: {
        alignSelf: 'stretch',
        height: 50,
        backgroundColor: '#FFF',
        borderColor: 'lightblue',
        borderWidth: 1
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
            country: this.props.user.country,
            password: this.props.user.password,
            data: []
        };
    }

    onTyping(text) {

        var countries = Countries.filter(function (country) {
            return country.name.toLowerCase().startsWith(text.toLowerCase())
        }).map(function (country) {
            return country.name;
        });

        this.setState({
            data: countries
        });
    }

    _saveUser() {
        this.setState({error: ''});
        if (this.state.email) {
            if (!validateEmail(this.state.email)) {
                this.setState({error: 'Email is not valid'});
                return;
            }
        }
        if (this.state.password== '' || this.state.password == null || this.state.password.length < 8) {
            this.setState({error: 'Password should be at least 8 characters'});
            return;
        }

        this.props.saveUser({
            _id: this.props.user._id,
            username: this.state.username,
            file: this.state.image,
            gender: this.state.gender,
            email: this.state.email,
            password: this.state.password,
            country: this.state.country
        });
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
                this.setState({
                    image: {data: 'data:image/jpeg;base64,' + response.data}
                });
            }
        });
    }

    render(route, navigator) {
        var source = '';
        if (this.state.image != undefined) {
            source = {uri: this.state.image.data};
        } else {
            source = require('../../public/user.png');
        }
        return (
            <View style={s.mainContainerCenter}>


                <TouchableOpacity onPress={() => this._addImage()}>
                    <Image style={styles.picture} source={source}/>
                </TouchableOpacity>

                <Text style={s.error}>{this.state.error}</Text>
                <TextInput
                    className="email"
                    style={s.formInput}
                    value={this.state.email}
                    onChange={(event) => this.setState({email: event.nativeEvent.text})}
                />
                <TextInput
                    className="password"
                    style={s.formInput}
                    placeholder={"***************"}
                    secureTextEntry={true}
                    onChange={(event) => this.setState({password: event.nativeEvent.text})}
                />

                <AutoComplete
                    className="country"
                    onTyping={this.onTyping.bind(this)}
                    onSelect={(e) => this.setState({country: e})}
                    suggestions={this.state.data}

                    value={this.state.country}
                    placeholder='Select a country'
                    style={s.formInput}
                    clearButtonMode='always'
                    returnKeyType='go'
                    textAlign='center'
                    clearTextOnFocus={true}

                    maximumNumberOfAutoCompleteRows={3}
                    applyBoldEffectToAutoCompleteSuggestions={true}
                    reverseAutoCompleteSuggestionsBoldEffect={true}
                    showTextFieldDropShadowWhenAutoCompleteTableIsOpen={false}
                    autoCompleteTableViewHidden={false}

                    autoCompleteTableBorderColor='lightblue'
                    autoCompleteTableBackgroundColor='white'
                    autoCompleteTableCornerRadius={3}
                    autoCompleteTableBorderWidth={1}

                    autoCompleteRowHeight={35}

                    autoCompleteFontSize={15}
                    autoCompleteRegularFontName='Helvetica Neue'
                    autoCompleteBoldFontName='Helvetica Bold'
                    autoCompleteTableCellTextColor={'gray'}
                />

                <TouchableOpacity onPress={(this._saveUser.bind(this))} style={s.simpleButton}>
                    <Text style={s.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

module.exports = EditProfile;
