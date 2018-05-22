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

    const strength = this.props.modification.strength ? this.props.strength + this.props.modification.strength : this.props.strength;
    const crit = this.props.modification.crit ? this.props.crit + this.props.modification.crit : this.props.crit;
    const defense = this.props.modification.defense ? this.props.defense + this.props.modification.defense : this.props.defense;
    const agility = this.props.modification.agility ? this.props.agility + this.props.modification.agility : this.props.agility;
    const movement = this.props.modification.movement ? this.props.movement + this.props.modification.movement : this.props.movement;
    const archery = this.props.modification.archery ? this.props.archery + this.props.modification.archery : this.props.archery;
    const currentRevenge = this.props.modification.currentRevenge ? this.props.currentRevenge + this.props.modification.currentRevenge : this.props.currentRevenge;

    return (
        <div className='character'>
          <div>
            <img src={ isDead ? `${process.env.PUBLIC_URL}/images/dead.png` : `${process.env.PUBLIC_URL}/${this.props.img}`} alt=""/>
            <div className="health-bar">
              <div>
                <span className="health-left" style={{width: `${healthPercent * 100}%`}}></span>
              </div>
              <p>HP: {this.props.currentHealth}/{this.props.health}</p>
            </div>
          </div>
          <ul>
            <li>
              <div><span className="icon">❤️</span> Health: </div>
               <div><span className='number hp'>{this.props.health}</span></div>
            </li>
            <li>
              <div> <span className="icon">🗡</span> Strength: </div>
              <div><span className='number'>{strength}</span></div>
            </li>
            <li>
              <div><span className="icon">⚔️</span> Critical Damage: </div> 
               <div><span className='number'>{crit}</span></div>
            </li>
            <li>
              <div><span className="icon">🛡</span> Defense: </div>
              <div><span className='number'>{defense}</span></div>
            </li>
            <li>
             <div> <span className="icon">🏇</span> Movement: </div>
             <div><span className='number'>{movement}</span></div>
            </li>
            <li>
              <div><span className="icon">🐍</span> Agility: </div>
              <div><span className='number'>{agility}</span></div>
            </li>
            <li>
             <div> <span className="icon">🏹</span> Archery: </div>
             <div><span className='number'>{archery}</span></div>
            </li>
            <li>
              <div> <span className="icon">👿</span> Revenge: </div>
              <div><span className='number'>{currentRevenge}</span></div>
            </li>
            {this.props.weapon &&
            <Fragment>
              <li>
                <div> <span className="icon">💣</span> Weapon: {this.props.weapon.join('; ')}</div>
                <div><span className='number'></span></div>
              </li>
            </Fragment>
            }
          </ul>
        </div>
    )
  }
}

Character.defaultProps = {
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
  revenge: 0,
  currentRevenge: 0,
  modification: {}
}

export default Character;
