import { troopsConstants } from '../constants/troops';
import cloneDeep from 'lodash/cloneDeep';
import { calculateAttack, calculateDefense, calculateDamage } from '../utils/common';
import update from 'react-addons-update';

const initialState = {
    players: {
        player1: {},
        player2: {},
    },
    hits: {
        player1: {},
        player2: {}
    }
};

const battlefield = ( state = initialState , action) => {
    switch(action.type) {
        case 'SET_PLAYER':
            var nextState = update(state, {
                players: {
                    [action.data.whichPlayer]: {$set: action.data.player}
                }
            });

            return nextState;

        case 'ATTACK':
            var nextState = update(state, {
                hits: {
                    [action.data.whoIsAttacking]: {$set: calculateAttack(action.data.attacker, action.data.dicesResults, action.data.isShooting)}
                }
            });

            return nextState;

        case 'DEFENSE':
           const enemy = action.data.whoIsDefencing === 'player1' ? 'player2' : 'player1';
           const isShooting = state.hits[enemy].shooting;

           var nextState = update(state, {
                hits: {
                    [action.data.whoIsDefencing]: {$set: calculateDefense(action.data.defencingPlayer, action.data.dicesResults, isShooting)}
                }
            });

            return nextState;

        case 'HEAL':
            const player = {...state.players[action.data.target]};

            var health = player.currentHealth += action.data.heal;
            // prevent healing more then max hp
            player.currentHealth = health > player.health ? player.health : health;

            var nextState = update(state, {
                players: {
                    [action.data.target]: {$set: player}
                }
            });
        
            return nextState;

        case 'RESET_ALL_UNITS_REVENGE':
            var nextState = update(state, {
                players: {
                    player1: {currentRevenge: {$set: state.players.player1.revenge}},
                    player2: {currentRevenge: {$set: state.players.player2.revenge}},
                }
            });

            return nextState;

        case 'RESET_ALL_UNITS_MODIFICATION':
            var nextState = update(state, {
                players: {
                    player1: {modification: {$set: {} }},
                    player2: {modification: {$set: {} }},
                }
            });

            return nextState;

        case 'APPLY_DAMAGE':
            const player1Hits = state.hits.player1;
            const player2Hits = state.hits.player2;
            const player1 = {...state.players.player1};
            const player2 = {...state.players.player2}; 

            if (player1Hits.attack === undefined || player2Hits.attack === undefined) {
                console.error('One or more players had not made their move');
                return state
            }

            // calculate damage done by player 2 to player 1
            const player1DamageReceived = calculateDamage(player2Hits,player1Hits);
            // calculate damage done by player 1 to player 2
            const player2DamageReceived = calculateDamage(player1Hits,player2Hits);

            // update revenge count
            player1.currentRevenge = player1Hits.revenge;
            player2.currentRevenge = player2Hits.revenge;

            // predict defender death to prevent revenge damage
            var isPlayer1Dead = false;
            var isPlayer2Dead = false;

            // if player 1 is Attacker
            if ( player1Hits.attacking ) {
                isPlayer2Dead = player2.currentHealth - player2DamageReceived <= 0;
            }

            // if player 2 is Attacker
            if ( player2Hits.attacking ) {
                isPlayer1Dead = player1.currentHealth - player1DamageReceived <= 0;
            }

            // apply damage & modify health
            if ( !isPlayer2Dead ) {
                player1.currentHealth = player1.currentHealth - player1DamageReceived;
            }

            if ( !isPlayer1Dead ) {
                player2.currentHealth = player2.currentHealth - player2DamageReceived;
            }

            return {
                ...state,
                players: {
                    player1,
                    player2
                },
                hits: {
                    player1: {},
                    player2: {}
                }
            }
            
        case 'INCREASE_SKILLS':
            var nextState = update(state, {
                players: {[action.data.playerId]: {
                    modification: {
                        [action.data.skill]: { $apply: (count) => ( count ? count + 1 : 1 ) 
                        } 
                    }
                }}  
            });

            return nextState;

        case 'DECREASE_SKILLS':
            var nextState = update(state, {
                players: {[action.data.playerId]: {
                    modification: {
                        [action.data.skill]: { $apply: (count) => ( count ? count - 1 : 0 ) 
                        } 
                    }
                }}  
            });

            return nextState;


        default :
            return state;
    }

};

export default battlefield;