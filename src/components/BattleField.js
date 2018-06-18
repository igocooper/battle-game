import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../css/style.css';
import * as actionCreators from '../actions/index';

import { commonConstants } from '../constants/common';
import { angleGenerator } from '../utils/dices';

import Dices from './Dices';
import Character from './Character';
import Controls from './Controls';
import Info from './Info';
import BattleMenu from './BattleMenu';
import SelectedTroops from './SelectedTroops';

// fireBase sync
import { firebaseApp } from '../firebase';
import { linkStoreWithPath } from 'firebase-redux';


class BattleField extends Component {
    componentDidMount = () => {
        const { id } = this.props.match.params;

        // The database path you want to bind with
        const troopsPath = `/troops/${id}`

        // Portion of the state that should be written to the database
        const troopsSelector = (state) => state.troops;

        // Create a function to bind '/message' in the database
        // with 'state.message' in the Redux store
        const linkTroops = linkStoreWithPath(   
            troopsPath, 
            actionCreators.setTroops, 
            troopsSelector
        );

        const { store } = this.context;
        // Invoke anywhere in the code to set up the binding
        this.unlink = linkTroops(firebaseApp.database(), store);
    }

    componentWillUnmount = () => {
        // Invoke unlink to remove the binding
        this.unlink();
    }
    
    

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

      _finishRound = () => {
        this.props.updateUnitsInCombat(this.props.battlefield.players.player1, this.props.battlefield.players.player2);
        this.props.resetAllUnitsRevenge();
        this.props.resetAllUnitsModification();
        
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
            <BattleMenu setPlayer={this.setPlayer} _finishRound={this._finishRound}/>
            <SelectedTroops />
        </Fragment>    
        )
    }
}

BattleField.contextTypes = {
    store: PropTypes.object
};

export default BattleField;

