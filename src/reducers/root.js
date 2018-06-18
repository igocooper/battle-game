import {combineReducers} from 'redux';
import troops from './troops';
import menu from './menu';
import battlefield from './battlefield';
import battlefields from './battlefields';

const root = combineReducers({
    troops,
    menu,
    battlefield,
    battlefields
});

export default root;