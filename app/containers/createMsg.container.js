var React = require('react-native');
var CreateMsg = require('../components/createMsg');

var {
    StyleSheet,
    } = React;

class CreateMsgContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loc: "",
            message: "",
            value: 0,
            message_type: 0
        };
        this._postMessage = this._postMessage.bind(this);
    }

    _postMessage() {
        var data = {
            validity: this.state.value,
            text: this.state.message,
            location: {
                lat: this.props.route.props.position.lat,
                lng: this.props.route.props.position.lng
            }
        };
        fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseData) => {
                alert(JSON.stringify(responseData));
            })
            .done();
        this.props.navigator.push({
            id: "MessageMapContainer"
        });
    }

    render() {
        return (
            <CreateMsg
                onPress = { () => this._postMessage}

            />
        );
    }
}

module.exports = CreateMsgContainer;
