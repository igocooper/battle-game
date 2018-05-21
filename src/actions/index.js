export function setActiveMenu(active) {
    return {
        type: 'SET_ACTIVE_MENU',
       data: {
           active
       }
    }
};

export function updateUnitsInCombat(player1, player2) {
    return {
        type: 'UPDATE_UNITS_IN_COMBAT',
        data: {
            player1,
            player2
        }
    }
};

export function resetAllUnitsRevenge() {
    return {
        type: 'RESET_ALL_UNITS_REVENGE'
    }
};

export function addTroop(troop , key) {
    return {
        type: 'ADD_TROOP',
        data: {
            troop, 
            key
        }
    }
}

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

export function heal(heal, target) {
    return {
        type: 'HEAL',
        data: {
            target,
            heal
        }
    }
}