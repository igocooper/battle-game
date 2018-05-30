import React, { Component, Fragment } from 'react'
import HealButton from './HealButton';
import ModifyButton from './ModifyButton';
import * as actionCreators from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmptyObject } from '../utils/common';

class Controls extends Component {
  _disableControls = () => {
    const { hits, players } = this.props.battlefield;
    const enemy = this.props.playerId === 'player1' ? 'player2' : 'player1';

    console.log(`${this.props.playerId}: `, players[this.props.playerId].currentHealth <= 0);
    console.log(players[enemy].currentHealth <= 0);
    const isAttackDissabled = isEmptyObject(players[this.props.playerId]) || isEmptyObject(players[enemy])  || !isEmptyObject(hits[enemy]) || players[this.props.playerId].currentHealth <= 0 || players[enemy].currentHealth <= 0;
    const isDefenseDissabled =  isEmptyObject(players[this.props.playerId]) || isEmptyObject(players[enemy])  || isEmptyObject(hits[enemy]);
    const disabledDefenseClass = isDefenseDissabled ? 'disabled' : '';
    const disabledAttackClass = isAttackDissabled ? 'disabled' : '';
    
    return {
      disabledDefenseClass,
      isDefenseDissabled,
      disabledAttackClass,
      isAttackDissabled
    }
  };

  render() {
    const { disabledDefenseClass, disabledAttackClass, isDefenseDissabled, isAttackDissabled } = this._disableControls();
    return (
      <Fragment>
        <div>
          <a href="#" 
            className={`btn-two red mini fixed ${disabledAttackClass}`}
            onClick={ () => {
              if (isAttackDissabled) return;
              this.props._attack(this.props.player, this.props.playerId);
            }}>
          🗡 Attack
          </a>

          <a href="#" 
            className={`btn-two blue mini fixed ${disabledDefenseClass}`} 
            onClick={ () => {
              if (isDefenseDissabled) return;
              this.props._defense(this.props.player, this.props.playerId);
            }}>
          🛡 Defense
          </a>

         {this.props.player.archery !== undefined && this.props.player.archery !== 0 &&
          <a href="#" 
            className={`btn-two green mini fixed ${disabledAttackClass}`}
            onClick={ () => {
              if (isAttackDissabled) return;
              this.props._shoot(this.props.player, this.props.playerId);
            }}>
          🎯 Shoot
          </a>
         }
        </div>

        <div>
          <HealButton {...this.props}/>
          <ModifyButton {...this.props}/>
        </div>

      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    troops: state.troops,
    battlefield: state.battlefield
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);