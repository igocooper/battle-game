export function updateUnitsInCombat(player1, player2) {
    return {
        type: 'UPDATE_UNITS_IN_COMBAT',
        data: {
            player1,
            player2
        }
    }
};