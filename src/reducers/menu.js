
const initialState = {
     active: 'troops'
};

const menu = ( state = initialState , action) => {
    switch(action.type) {
        case 'SET_ACTIVE_MENU':
            return {
                ...state,
                active: action.data.active
            }
        default :
            return state;
    }

};

export default menu;