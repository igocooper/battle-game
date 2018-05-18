import { applyMiddleware, createStore , compose } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {saveState, loadState} from './localStorage.js';
import root from '../reducers/root';
import troops from '../reducers/troops';
import throttle from 'lodash/throttle';
import ReduxThunk from 'redux-thunk';
import { commonConstants } from '../constants/common';

const configureStore = () => {

    // const persistedState = loadState();
    const persistedState = [...commonConstants.DEFAULT_TROOPS];
    const store = createStore(
        troops,
        persistedState,
        composeWithDevTools(applyMiddleware(
            ReduxThunk
        ))
    );

    store.subscribe( throttle( () => {
        saveState({
            troops: store.getState().troops
        });
    }, 1000));

    return store
};

export default configureStore;