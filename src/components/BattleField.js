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

      _attack = (attacker, whoIsAttacking ) => {
        const dicesResults = this.roll();
        this.props.attack(attacker, dicesResults, whoIsAttacking);
      };

      _shoot = (attacker, whoIsAttacking ) => {
        const dicesResults = this.roll();
        this.props.attack(attacker, dicesResults, whoIsAttacking, true);
      };

      _defense = (defencingPlayer, whoIsDefencing ) => {
        const dicesResults = this.roll();

        this.props.defense(defencingPlayer, dicesResults, whoIsDefencing);
        setTimeout( () => {
            this.props.applyDamage();
            this.props.updateUnitsInCombat(this.props.battlefield.players.player1, this.props.battlefield.players.player2);
        }, 2000)
      };

      setPlayer = (player, whichPlayer) => {
        this.props.setPlayer(player, whichPlayer);
      };

      finishBattle = () => {
        this.props.updateUnitsInCombat(this.props.battlefield.players.player1, this.props.battlefield.players.player2);
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
                        _attack={this._attack} 
                        _defense={this._defense} 
                        _shoot={this._shoot}
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
                        _attack={this._attack} 
                        _defense={this._defense} 
                        _shoot={this._shoot}
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

