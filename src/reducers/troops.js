import { troopsConstants } from '../constants/troops';
import _ from 'lodash';

const initialState = {
    ...troopsConstants
};

const troops = ( state = initialState , action) => {
    switch(action.type) {
        case 'UPDATE_UNITS_IN_COMBAT':
            const troop1 = _.cloneDeep(state[action.data.player1._troop_id]);
            const troop2 = _.cloneDeep(state[action.data.player2._troop_id]);
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

            return {
                ...state,
                [action.data.player1._troop_id] : troop1,
                [action.data.player2._troop_id] : troop2,
            }
        default :
            return state;
    }

};

export default troops;