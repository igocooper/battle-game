import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Button, Popup, Grid, Dropdown, Menu } from 'semantic-ui-react'

class SelectPlayer extends Component {

    handlePlayerSelect = (player) => {
        this.props.setPlayer(player, this.props.whichPlayer)
    }

    render() {
        return (
            <Popup
                trigger={<button className="btn-two blue small" > 🎲 Select {this.props.whichPlayer}</button>}
                flowing
                hoverable
            >
                <Menu secondary vertical>
                    {this.props.troops && Object.keys(this.props.troops).map( (troop, troopIndex) => {
                        return (
                        <Dropdown item text={troop} key={troopIndex}>
                            <Dropdown.Menu>
                                <Dropdown.Header>Select Unit</Dropdown.Header>
                                {this.props.troops[troop] && this.props.troops[troop].units.map( (unit, index) => {
                                    return (
                                        <Dropdown.Item key={index} onClick={ () => this.handlePlayerSelect(unit)}>
                                            {unit.name} {index === 0 ? '💀' : '☠️' }
                                        </Dropdown.Item>
                                    )
                                })} 
                            </Dropdown.Menu>
                        </Dropdown>
                        )
                    })}
                </Menu>
            </Popup>
        )
    }
}


class BattleMenu extends Component {
  render() {
    return (
        <div className='battle-menu'>
            <SelectPlayer {...this.props} whichPlayer='player1'/>
            <button onClick={this.props.finishBattle} className="btn-two green small"> ⌛️ Finish Round</button>
            <SelectPlayer {...this.props} whichPlayer='player2'/>
        </div> 
    )
  }
}

const mapStateToProps = (state) => {
    return {
        troops: state.troops
    }
}

export default connect(mapStateToProps, null)(BattleMenu);
