import { troopsConstants } from '../constants/troops';
import cloneDeep from 'lodash/cloneDeep';
import { calculateAttack, calculateDefense, calculateDamage } from '../utils/common';

const initialState = {
    players: {
        player1: null,
        player2: null,
    },
    player1Hits: {},
    player2Hits: {}
};

const battlefield = ( state = initialState , action) => {
    switch(action.type) {
        case 'ATTACK':
            return {
                ...state,
                [action.data.whoIsAttacking] : calculateAttack(action.data.attacker, action.data.dicesResults, action.data.isShooting)
            };

        case 'DEFENSE':
            return {
                ...state,
                [action.data.whoIsDefencing] : calculateDefense(action.data.defencingPlayer, action.data.dicesResults)
        };

        case 'APPLY_DAMAGE':
            const player1Hits= this.state.player1Hits;
            const player2Hits = this.state.player2Hits;

            if (player1Hits.attack === undefined || player2Hits.attack === undefined) {
                console.error('One or more players had not made their move');
                return
            }

            // calculate damage done by player 2 to player 1
            const player1DamageReceived = calculateDamage(player2Hits,player1Hits);
            // calculate damage done by player 1 to player 2
            const player2DamageReceived = calculateDamage(player1Hits,player2Hits);

            // copy players
            const player1 = {...this.state.players.player1};
            const player2 = {...this.state.players.player2};

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
            if ( !isPlayer2Dead && !player1Hits.shooting) {
                player1.currentHealth = player1.currentHealth - player1DamageReceived;
            }

            if ( !isPlayer1Dead && !player2Hits.shooting) {
                player2.currentHealth = player2.currentHealth - player2DamageReceived;
            }

            return {
                ...state
            }

        default :
            return state;
    }

};

export default battlefield;