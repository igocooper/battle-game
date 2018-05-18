import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import  configureStore  from './utils/configureStore.js';

// init store
const reduxStore = configureStore();

ReactDOM.render(
    <Provider store = {reduxStore} >
        <Router />
    </Provider>,
 document.getElementById('root'));
registerServiceWorker();
