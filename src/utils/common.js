import update from 'react-addons-update';

export function calculateAttack(attacker, dicesResults, shooting = false) {
    // apply buffs and curses
    if (!isEmptyObject(attacker.modification)) {
        Object.entries(attacker.modification).forEach( ( [skill, value] ) => {
            attacker = update(attacker, {
                [skill]: {$apply: (state) => state + value}
            });
        });

        console.log(attacker);
    }

    const crit =  dicesResults.crit >= (7 - attacker.crit);
    const attack = crit ?
    (dicesResults.attack * 2) + attacker.strength :
    dicesResults.attack + attacker.strength;

    return {
        attack: attack,
        block: attacker.defense ? dicesResults.block + attacker.defense : 0,
        dodge: dicesResults.dodge >= (7 - attacker.agility),
        luck: dicesResults.luck === 6,
        crit: crit,
        revenge: attacker.currentRevenge,
        attacking: true,
        shooting: shooting
    }
};

export function calculateDefense(defencingPlayer, dicesResults, isShooting) {
    // apply buffs and curses
    if (defencingPlayer.modification) {
        defencingPlayer = {
            ...defencingPlayer,
            ...defencingPlayer.modification
        }
    } 

    const luck = dicesResults.luck === 6;
    const crit = dicesResults.crit >= (7 - defencingPlayer.crit);
    let attack = dicesResults.attack + defencingPlayer.strength;
    let revenge = defencingPlayer.currentRevenge

    if (attack && crit) {
        attack = (dicesResults.attack * 2 ) + defencingPlayer.strength;
    }

    // player don't strike back if attacker is shooting
    if ( isShooting ) {
        attack = 0;
    } else {
        attack = defencingPlayer.currentRevenge ? attack : luck ? attack : 0
        if (revenge > 0 ) {
            revenge--
        }
    }
    
    return {
        attack: attack,
        block: defencingPlayer.defense ? dicesResults.block + defencingPlayer.defense : 0,
        crit: crit,
        dodge: dicesResults.dodge >= (7 - defencingPlayer.agility),
        luck: false,
        revenge: revenge,
        attacking: false
    }
};

export function calculateDamage(attacker, defencer) {
    // calculate damage 
    let defencerDamage = attacker.attack - defencer.block;
    // if defencer dodged then no damage is done
    if (defencer.dodge) {
        defencerDamage = 0;
    }
    // if attacker has luck he omits defencer armor and hits dodgers
    if (attacker.luck) {
        defencerDamage = attacker.attack;
    }
    
    return defencerDamage >= 0 ? defencerDamage : 0
}

export function isEmptyObject(obj) {
    if ( obj === undefined || obj === null  ) return
    return Object.keys(obj).length === 0 && obj.constructor === Object
}
