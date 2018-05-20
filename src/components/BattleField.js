import React, { Component, Fragment } from 'react';
import '../css/style.css';
import * as actionCreators from '../actions/index';
import { bindActionCreators } from 'redux';

import { commonConstants } from '../constants/common';
import { angleGenerator } from '../utils/dices';
import { calculateAttack, calculateDefense, calculateDamage } from '../utils/common';

import Dices from './Dices';
import Character from './Character';
import Controls from './Controls';
import Info from './Info';
import BattleMenu from './BattleMenu';
import { connect } from 'react-redux';

class BattleField extends Component {
    state = {
        players: {
            player1: null,
            player2: null,
        },
        player1Hits: {},
        player2Hits: {}
    };

    roll = () => {
        // play audio
        this.audio.currentTime = 0; // rewind sound
        this.audio.play();

        // animate dices
        let dices = Array.prototype.slice.call(document.querySelectorAll('.cubic'));
        let speed = 500;
        const results = {};
      
        dices.forEach((dice) => {
            let { x, y, z, result } = angleGenerator();
            const property = dice.dataset.property;
            // write results 
            results[property] ? 
            results[property] = results[property] + result :
            results[property] = result; 
    
            dice.style.cssText = `
                -webkit-transform: none;
                        transform: none;
            `;
    
            setTimeout(() => {
                // request render
                dice.style.cssText = `
                    -webkit-transition-duration: ${speed}ms;
                            transition-duration: ${speed}ms;
                    -webkit-transform: rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg);
                            transform: rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg);
                `;
            }, 10);
        });

        return results
      };

      attack = (attacker, whoIsAttacking ) => {
        const dicesResults = this.roll();

        this.props.attack(attacker, dicesResults, whoIsAttacking);

        // TODO: remove local state update
        this.setState({
            [whoIsAttacking]: calculateAttack(attacker, dicesResults)
        });
      };

      shoot = (attacker, whoIsAttacking ) => {
        const dicesResults = this.roll();

        this.props.attack(attacker, dicesResults, whoIsAttacking, true);

        // TODO: remove local state update
        this.setState({
            [whoIsAttacking]: calculateAttack(attacker, dicesResults, true)
        });
      };

      defense = (defencingPlayer, whoIsDefencing ) => {
        const dicesResults = this.roll();

        this.props.defense(defencingPlayer, dicesResults, whoIsDefencing);

        // TODO: remove local state update
        this.setState({
            [whoIsDefencing]: calculateDefense(defencingPlayer, dicesResults)
        });
       setTimeout( () => {
           this.calculateDamage();
           this.props.updateUnitsInCombat(this.state.players.player1,this.state.players.player2);
        }, 2000 );
      };

      heal = (heal, target) => {
           // copy players
        const player1 = {...this.state.players.player1};
        const player2 = {...this.state.players.player2};

        switch(target) {
            case 'player1':
            var health = player1.currentHealth += heal;
            // prevent healing more then max hp
            player1.currentHealth = health > player1.health ? player1.health : health;
            break;
            case 'player2':
            var health = player2.currentHealth += heal;
             // prevent healing more then max hp
             player2.currentHealth = health > player2.health ? player2.health : health;
            break; 
        }
        
        this.setState({
            players : {
                ...this.state.players,
                player1,
                player2
            }
        });

        setTimeout( () => {
            this.props.updateUnitsInCombat(this.state.players.player1,this.state.players.player2);
         }, 2000 );
      }

      calculateDamage = () => {
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

        this.setState({
            players : {
                ...this.state.players,
                player1,
                player2
            },
            player1Hits: {},
            player2Hits: {}
        })

      };

      setPlayer = (player, whichPlayer) => {
        this.setState({
            players: {
                ...this.state.players,
                [whichPlayer] : player
            }
        });
      };

      finishBattle = () => {
        this.props.updateUnitsInCombat(this.state.players.player1,this.state.players.player2);
        this.props.resetAllUnitsRevenge();
        
        // reset state
        this.setState({
            players : {
                player1: null,
                player2: null
            },
            player1Hits: {},
            player2Hits: {}
        })
      }

    render() {
        return ( 
        <Fragment>     
            <div className="board">
                <div>
                    <Character {...this.state.players.player1}/>
                    <Controls 
                        player={this.state.players.player1} 
                        hits='player1Hits'
                        who='player1'
                        attack={this.attack} 
                        defense={this.defense} 
                        heal={this.heal} 
                        shoot={this.shoot}
                    />
                </div>
                <div>
                <Dices roll={this.roll}/>
                <Info 
                    player1Hits={this.state.player1Hits}
                    player2Hits={this.state.player2Hits}
                />
                </div>
                <div>
                    <Character {...this.state.players.player2}/>
                    <Controls 
                        player={this.state.players.player2} 
                        hits='player2Hits'
                        who='player2'
                        attack={this.attack} 
                        defense={this.defense} 
                        heal={this.heal} 
                        shoot={this.shoot}
                    />
                </div>
                <audio ref={(element) => { this.audio = element; }} src={`${process.env.PUBLIC_URL}/sounds/dice.mp3`}></audio>
            </div>
            <BattleMenu setPlayer={this.setPlayer} finishBattle={this.finishBattle}/>
        </Fragment>    
        )
    }
}

export default BattleField;

