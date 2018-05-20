import React, { Component, Fragment } from 'react'
import HealButton from './HealButton';
import ModifyButton from './ModifyButton';

export default class Controls extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <a href="#" 
            className="btn-two red mini" 
            onClick={ () => {
            this.props.attack(this.props.player, this.props.playerId);
            }}>
          🗡 Attack
          </a>

          <a href="#" 
            className="btn-two blue mini" 
            onClick={ () => {
            this.props.defense(this.props.player, this.props.playerId);
            }}>
          🛡 Defense
          </a>

          <HealButton {...this.props}/>
        </div>

        <div>
          <a href="#" 
            className="btn-two green mini" 
            onClick={ () => {
            this.props.shoot(this.props.player, this.props.hitplayerIds);
            }}>
          🎯 Shoot
          </a>
          <ModifyButton />
        </div>

      </Fragment>
    )
  }
}
