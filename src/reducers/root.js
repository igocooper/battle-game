import {combineReducers} from 'redux';
import troops from './troops';
import menu from './menu';
import battlefield from './battlefield';

const root = combineReducers({
    troops,
    menu,
    battlefield
});

export default root;