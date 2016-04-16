/**
 * Created by Dasha on 14/04/16.
 */
import React, {requireNativeComponent} from "react-native";
var {
    StyleSheet,
} = React;
var AR = requireNativeComponent('ARView', ARView);
var styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        // marginTop: 65,
        flex: 1
    },
});
class ARView extends React.Component {
    render() {
        console.log('AR AR AR AR render');
        return (
            <AR style={styles.mainContainer}/>
        );
    }
}

module.exports = ARView;
