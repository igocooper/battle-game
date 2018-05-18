import React, { Component, Fragment } from 'react';

class Character extends Component {
 
  render() {
    let health = this.props.currentHealth;
    // fix health percent for negative numvers
    if (health < 0 ) {
      health = 0;
    }
    const healthPercent = health/this.props.health;
    const isDead = this.props.currentHealth <= 0;

    return (
        <div className='character'>
          <div>
            <img src={ isDead ? 'images/dead.png' : this.props.img} alt=""/>
            <div className="health-bar">
              <div>
                <span className="health-left" style={{width: `${healthPercent * 100}%`}}></span>
              </div>
              <p>HP: {this.props.currentHealth}/{this.props.health}</p>
            </div>
          </div>
          <ul>
            <li>
              <span className="icon">❤️</span>
               Health: <span className='number hp'>{this.props.health}</span>
            </li>
            <li>
              <span className="icon">🗡</span>
               Strength: <span className='number'>{this.props.strength}</span>
            </li>
            <li>
              <span className="icon">🗡</span>
               Critical Damage: <span className='number'>{this.props.crit}</span>
            </li>
            <li>
              <span className="icon">🛡</span>
               Defense: <span className='number'>{this.props.defense}</span>
            </li>
            <li>
              <span className="icon">🏇</span> 
              Movement: <span className='number'>{this.props.movement}</span>
            </li>
            <li>
              <span className="icon">🐍</span>
               Agility: <span className='number'>{this.props.agility}</span>
            </li>
            <li>
              <span className="icon">🏹</span>
             Archery: <span className='number'>{this.props.archery}</span>
            </li>
          </ul>
        </div>
    )
  }
}

Character.defaultProps = {
  troop: 'Konung',
  img: 'images/konung.png',
  health: 52,
  currentHealth: 12,
  strength: 2,
  defense: 2,
  movement: 1,
  agility: 0,
  archery: 0,
  crit: 0
}

export default Character;
