import { applyMiddleware, createStore , compose } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {saveState, loadState} from './localStorage.js';
import root from '../reducers/root';
import throttle from 'lodash/throttle';
import ReduxThunk from 'redux-thunk';
import { commonConstants } from '../constants/common';

const configureStore = () => {

    const persistedState = loadState();
    const store = createStore(
        root,
        persistedState,
        composeWithDevTools(applyMiddleware(
            ReduxThunk
        ))
    );

    store.subscribe( throttle( () => {
        saveState({
            ...store.getState()
        });
    }, 1000));

    return store
};

export default configureStore;