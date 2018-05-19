import {combineReducers} from 'redux';
import troops from './troops';
import menu from './menu';

const root = combineReducers({
    troops,
    menu
});

export default root;