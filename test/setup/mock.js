import React from "react";

// var AutoComplete = require('react-native-autocomplete');

const RN = React;

export const PropTypes = React.PropTypes;

RN.StyleSheet = {
    create: (style) => style
};

const createComponent = (type) => {
    return React.createClass({
        displayName: type,
        propTypes: {
            children: React.PropTypes.node
        },
        render() {
            return <div {...this.props}>{this.props.children}</div>;
        }
    });
};

RN.ImagePickerManager = createComponent('NativeModules').ImagePickerManager;
RN.RCTAutoComplete = createComponent('RCTAutoComplete');
export default RN;