import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from '../../node_modules/redux-logger/src/index'
import rootReducer from '../reducers/index.reducer'

const loggerMiddleware = createLogger()

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}