import React, { Component, Fragment } from 'react'
import HealButton from './HealButton';

export default class Controls extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <a href="#" 
            className="btn-two red mini" 
            onClick={ () => {
            this.props.attack(this.props.player, this.props.hits);
            }}>
          🗡 Attack
          </a>

          <a href="#" 
            className="btn-two blue mini" 
            onClick={ () => {
            this.props.defense(this.props.player, this.props.hits);
            }}>
          🛡 Defense
          </a>

          <HealButton {...this.props}/>
        </div>

        <div>
          <a href="#" 
            className="btn-two green mini" 
            onClick={ () => {
            this.props.shoot(this.props.player, this.props.hits);
            }}>
          🎯 Shoot
          </a>
          <a href="#" 
            className="btn-two cyan mini" 
            onClick={ () => {
              console.log('nothing has been done');
            }}>
         ⚙️ modify
          </a>
        </div>

      </Fragment>
    )
  }
}
