import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import  configureStore  from './utils/configureStore.js';

// init store
const reduxStore = configureStore();

ReactDOM.render(
    <Provider store = {reduxStore} >
        <App />
    </Provider>,
 document.getElementById('root'));
registerServiceWorker();
