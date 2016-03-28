'use strict';
import React, {AppRegistry,Component,} from 'react-native';
import { Provider } from 'react-redux'
import configureStore from './app/store/configureStore'
import Root from './app/containers/root.container'


const store = configureStore();

class AirMsgProject extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('AirMsgProject', () => AirMsgProject);