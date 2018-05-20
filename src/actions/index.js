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

// BATTLEFIELD

export function attack(attacker, dicesResults, whoIsAttacking, isShooting = false) {
    return {
        type: 'ATTACK',
        data: {
            attacker,
            dicesResults,
            whoIsAttacking,
            isShooting
        }
    }
};

export function defense(defencingPlayer, dicesResults, whoIsDefencing) {
    return {
        type: 'DEFENSE',
        data: {
            defencingPlayer,
            dicesResults,
            whoIsDefencing,
        }
    }
};

export function applyDamage() {
    return {
        type: 'APPLY_DAMAGE'
    }
};

export function setPlayer(player, whichPlayer) {
    return {
        type: 'SET_PLAYER',
        data: {
            player,
            whichPlayer
        }
    }
}