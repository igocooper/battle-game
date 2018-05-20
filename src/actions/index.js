export function updateUnitsInCombat(player1, player2) {
    return {
        type: 'UPDATE_UNITS_IN_COMBAT',
        data: {
            player1,
            player2
        }
    }
};

export function setActiveMenu(active) {
    return {
        type: 'SET_ACTIVE_MENU',
       data: {
           active
       }
    }
};

export function resetAllUnitsRevenge() {
    return {
        type: 'RESET_ALL_UNITS_REVENGE'
    }
};