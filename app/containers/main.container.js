import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as authActions from "../actions/auth.actions";

var Routes = require('../config/routes');
var React = require('react-native');
var Login = require('../components/login');
var {
    Navigator,
} = React;
var CustomSceneConfig = Object.assign({},
    Navigator.SceneConfigs.PushFromRight, {
        gestures: {
            pop: null
        }
    });

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            error: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({error: null});
        if (nextProps.hasOwnProperty('error') && nextProps.error !== undefined) {
            this.setState({error: nextProps.error});
        }
        if (nextProps.hasOwnProperty('tokenInfo') && nextProps.tokenInfo !== undefined) {
            this.props.navigator.push({
                id: Routes.messageMap,
                title: 'Message Map',
                sceneConfig: CustomSceneConfig
            });
        }
    }

    render() {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
            />
        );
    }

    renderScene(route, navigator) {
        return (
            <Login
                error={this.state.error}
                basicLogin={(a,b) => this.props.basicLogin(a,b)}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        tokenInfo: store.user.tokenInfo,
        error: store.user.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        basicLogin: bindActionCreators(authActions.basicLogin, dispatch)
    };
};

MainContainer = connect(mapStateToProps, mapDispatchToProps)(MainContainer);

module.exports = MainContainer;
