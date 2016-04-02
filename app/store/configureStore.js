import { createStore, applyMiddleware } from 'redux'
import createLogger from '../../node_modules/redux-logger/src/index'
import rootReducer from '../reducers/index.reducer'
import createSagaMiddleware from 'redux-saga'
import { watchLogin, watchMessagePost, watchMessagesLoad } from '../sagas/sagas'

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware(watchLogin, watchMessagePost, watchMessagesLoad);

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            loggerMiddleware,
            sagaMiddleware
        )
    )
}