import cloneDeep from 'lodash/cloneDeep';
import update from 'react-addons-update';

const initialState = {};

const battlefields = ( state = initialState , action) => {
    switch(action.type) {
        case 'SET_BATTLEFIELDS':

            return {
                ...action.payload
            }

        case 'ADD_BATTLEFIELD':
            const { id } = action.data.battleField;

            var nextState = update(state, {
                [id]: {$set: action.data.battleField}
            });

            return nextState;

        default :
            return state;
    }

};

export default battlefields;