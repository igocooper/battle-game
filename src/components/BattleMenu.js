import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import { bindActionCreators } from 'redux';
import { troopsConstants } from '../constants/troops';
import { isEmptyObject } from '../utils/common';

import { Header, Button, Popup, Grid, Dropdown, Menu } from 'semantic-ui-react'

class SelectPlayer extends Component {

    handlePlayerSelect = (player) => {
        this.props.setPlayer(player, this.props.whichPlayer)
    }

    render() {
        return (
            <Popup
                trigger={<button className="btn-two blue small" > 🎲 Select Troops</button>}
                flowing
                hoverable
                on='click'
            >
                <Menu secondary vertical>
                    {troopsConstants && Object.entries(troopsConstants).map( ( [key, troop] ) => {
                        return (
                            <Menu.Item name={troop.name} key={key} onClick={ () => this.props.addTroop(troop, key)} />
                        )
                    })}
                </Menu>
            </Popup>
        )
    }
}


class BattleMenu extends Component {
  render() {
      const { players } = this.props.battlefield;
    return (
        <div className='battle-menu'>
            <SelectPlayer {...this.props} />
            <button 
                className="btn-two green small"
                disabled={isEmptyObject(players.player1) || isEmptyObject(players.player2)}
                onClick={this.props.finishBattle}
            > ⌛️ Finish Round
            </button>
        </div> 
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

export default connect(mapStateToProps, mapDispatchToProps)(BattleMenu);
