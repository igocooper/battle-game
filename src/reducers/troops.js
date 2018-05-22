import { troopsConstants } from '../constants/troops';
import cloneDeep from 'lodash/cloneDeep';
import update from 'react-addons-update';

const initialState = {
    // ...troopsConstants
};


const units = (state = [], action) => {
    switch(action.type){
        case 'INCREASE_SKILLS':
            var unitIndex;
            state.forEach( (unit, index) => {
                if (unit.name === action.data.player.name){
                    unitIndex = index;
                }
            });
            var nextState = update(state, {
                [unitIndex]: {
                    modification: {
                        [action.data.skill]: { $apply: (count) => (count ? count + 1 : 1)}
                    }
                }
            });
            return nextState;

        case 'DECREASE_SKILLS':
            var unitIndex;
            state.forEach( (unit, index) => {
                if (unit.name === action.data.player.name){
                    unitIndex = index;
                }
            });
            var nextState = update(state, {
                [unitIndex]: {
                    modification: {
                        [action.data.skill]: { $apply: (count) => (count ? count - 1 : 0)}
                    }
                }
            });
            return nextState;
    }
};

const troops = ( state = initialState , action) => {
    switch(action.type) {
        case 'UPDATE_UNITS_IN_COMBAT':
            const troop1 = cloneDeep(state[action.data.player1._troop_id]);
            const troop2 = cloneDeep(state[action.data.player2._troop_id]);
            let unit1Index;
            let unit2Index;

            // find player 1
            troop1.units.forEach( (unit, index) => {
                if (unit.name === action.data.player1.name) {
                    unit1Index = index;
                }
            });
            // find player 2
            troop2.units.forEach( (unit, index) => {
                if (unit.name === action.data.player2.name) {
                    unit2Index = index;
                }
            });

            // update currentHealth
            troop1.units[unit1Index].currentHealth = action.data.player1.currentHealth;
            troop2.units[unit2Index].currentHealth = action.data.player2.currentHealth;

            // update currentRevenge
            troop1.units[unit1Index].currentRevenge = action.data.player1.currentRevenge;
            troop2.units[unit2Index].currentRevenge = action.data.player2.currentRevenge;

            return {
                ...state,
                [action.data.player1._troop_id] : troop1,
                [action.data.player2._troop_id] : troop2,
            }

        case 'RESET_ALL_UNITS_REVENGE':
            var currentState = cloneDeep(state);
            
            // map through each and set it's current revenge to revenge
            Object.entries(currentState).forEach( ( [key, value] ) => {
                value.units.forEach( (unit, unitIndex) => {
                    const revenge = unit.revenge;
                    currentState[key].units[unitIndex].currentRevenge = revenge;
                });
            });

            return currentState;

        case 'RESET_ALL_UNITS_MODIFICATION':
            var currentState = cloneDeep(state);
            
            // map through each and reset it's modification
            Object.entries(currentState).forEach( ( [key, value] ) => {
                value.units.forEach( (unit, unitIndex) => {
                    currentState[key].units[unitIndex].modification = {};
                });
            });

            return currentState;

        case 'ADD_TROOP':
            var nextState = update(state, {
                [action.data.key]: { $set: {...action.data.troop} }
            });

            return nextState;

        case 'INCREASE_SKILLS':
            var troop_id = action.data.player._troop_id;

            var nextState = update(state, {
                [troop_id]: {
                    units: {$apply: (state) => ( units(state, action)) }
                }
            });

            return nextState;

        case 'INCREASE_SKILLS':
            var troop_id = action.data.player._troop_id;

            var nextState = update(state, {
                [troop_id]: {
                    units: {$apply: (state) => ( units(state, action)) }
                }
            });

            return nextState;

        default :
            return state;
    }

};

export default troops;