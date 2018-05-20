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
      };

      shoot = (attacker, whoIsAttacking ) => {
        const dicesResults = this.roll();
        this.props.attack(attacker, dicesResults, whoIsAttacking, true);
      };

      defense = (defencingPlayer, whoIsDefencing ) => {
        const dicesResults = this.roll();

        this.props.defense(defencingPlayer, dicesResults, whoIsDefencing);
        this.props.applyDamage();
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

      setPlayer = (player, whichPlayer) => {
        this.props.setPlayer(player, whichPlayer);
      };

      finishBattle = () => {
        this.props.updateUnitsInCombat(this.state.players.player1,this.state.players.player2);
        this.props.resetAllUnitsRevenge();
        
      }

    render() {
        const { player1, player2 }  = this.props.battlefield.players; 
        const { player1: player1Hits, player2: player2Hits } = this.props.battlefield.hits;
        return ( 
        <Fragment>     
            <div className="board">
                <div>
                    <Character {...player1}/>
                    <Controls 
                        player={player1} 
                        playerId='player1'
                        attack={this.attack} 
                        defense={this.defense} 
                        heal={this.heal} 
                        shoot={this.shoot}
                    />
                </div>
                <div>
                <Dices roll={this.roll}/>
                <Info 
                    player1Hits={player1Hits}
                    player2Hits={player2Hits}
                />
                </div>
                <div>
                    <Character {...player2}/>
                    <Controls 
                        player={player2} 
                        playerId='player2'
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

