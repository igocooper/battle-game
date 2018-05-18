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
            player3: {
                troop: 'Konung',
                img: 'images/konung.png',
                health: 52,
                currentHealth: 52,
                revenge: 1,
                strength: 2,
                defense: 2,
                movement: 1,
                agility: 0,
                archery: 0,
                crit: 1
            },
            player4: {
                troop: 'Avalon',
                img: 'images/avalon.png',
                health: 32,
                currentHealth: 32,
                revenge: 1,
                strength: 1,
                defense: 0,
                movement: 2,
                agility: 3,
                archery: 2,
                crit: 1
              },
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

      attack = (attacker, who ) => {
        const dicesResults = this.roll();

        this.setState({
            [who]: calculateAttack(attacker, dicesResults)
        });
      };

      defense = (defencingPlayer, who ) => {
        const dicesResults = this.roll();

        this.setState({
            [who]: calculateDefense(defencingPlayer, dicesResults)
        });
       setTimeout( this.calculateDamage, 2000 )
      };

      round = () => {
           // copy players
        const player1 = {...this.state.players.player1};
        const player2 = {...this.state.players.player2};

        player1.revenge = 1;
        player2.revenge = 1;
        
        this.setState({
            players : {
                ...this.state.players,
                player1,
                player2
            },
            player1Hits: {},
            player2Hits: {}
        })
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
        player1.revenge = player1Hits.revenge;
        player2.revenge = player2Hits.revenge;

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

        // modify health
        if ( !isPlayer2Dead ) {
            player1.currentHealth = player1.currentHealth - player1DamageReceived;
        }

        if ( !isPlayer1Dead ) {
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
                        attack={this.attack} 
                        defense={this.defense} 
                        round={this.round} 
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
                        attack={this.attack} 
                        defense={this.defense} 
                        round={this.round} 
                    />
                </div>
                <audio ref={(element) => { this.audio = element; }} src={`${process.env.PUBLIC_URL}/sounds/dice.mp3`}></audio>
            </div>
            <BattleMenu setPlayer={this.setPlayer} finishBattle={this.finishBattle}/>
        </Fragment>    
        )
    }
}

const mapStateToProps = (state) => {
    return {
        troops: state
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BattleField);

