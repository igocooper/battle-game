import { troopsConstants } from '../constants/troops';
import cloneDeep from 'lodash/cloneDeep';
import { calculateAttack, calculateDefense, calculateDamage } from '../utils/common';


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
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.data.whichPlayer]: action.data.player
                }
            }
        case 'ATTACK':
            return {
                ...state,
                hits: {
                    ...state.hits,
                    [action.data.whoIsAttacking] : calculateAttack(action.data.attacker, action.data.dicesResults, action.data.isShooting)
                }
            };

        case 'DEFENSE':
           const enemy = action.data.whoIsDefencing === 'player1' ? 'player2' : 'player1';
           const isShooting = state.hits[enemy].shooting;

            return {
                ...state,
                hits: {
                    ...state.hits,
                    [action.data.whoIsDefencing] : calculateDefense(action.data.defencingPlayer, action.data.dicesResults, isShooting)
                }
            };

        case 'HEAL':
            const player = {...state.players[action.data.target]};

            var health = player.currentHealth += action.data.heal;
            // prevent healing more then max hp
            player.currentHealth = health > player.health ? player.health : health;
        
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.data.target]: player
                }
            };

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

        default :
            return state;
    }

};

export default battlefield;