import React, { Component, Fragment } from 'react';

class Unit extends Component {

  _handleSelectPlayer1 = () => {
    const isDisabled = this.props.battlefield.players.player2._troop_id === this.props._troop_id;

    if(!isDisabled) {
      this.props.setPlayer(this.props.unit, 'player1');
    }
     
  };

  _handleSelectPlayer2 = (e) => {
    e.preventDefault();
    const isDisabled = this.props.battlefield.players.player1._troop_id === this.props._troop_id;

    if(!isDisabled) {
      this.props.setPlayer(this.props.unit, 'player2');
    }
   
};

 
  render() {
    let health = this.props.currentHealth;
    // fix health percent for negative numvers
    if (health < 0 ) {
      health = 0;
    }
    const healthPercent = health/this.props.health;
    const isDead = this.props.currentHealth <= 0;

    return (
        <div className='character' 
            onClick={this._handleSelectPlayer1}
            onContextMenu={this._handleSelectPlayer2}
            >
          <div>
            <img src={ isDead ? `${process.env.PUBLIC_URL}/images/dead.png` : `${process.env.PUBLIC_URL}/${this.props.img}`} alt=""/>
            <div className="health-bar">
              <div>
                <span className="health-left" style={{width: `${healthPercent * 100}%`}}></span>
              </div>
              <p>HP: {this.props.currentHealth}/{this.props.health}</p>
            </div>
          </div>
        </div>
    )
  }
}

Unit.defaultProps = {
  name: 'Sample',
  img: 'images/character_sample.png',
  health: 1,
  currentHealth: 1,
  strength: 0,
  defense: 0,
  movement: 0,
  agility: 0,
  archery: 0,
  crit: 0,
  revenge: 0
}

export default Unit;
