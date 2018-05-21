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
              <div><span className='number'>{this.props.strength}</span></div>
            </li>
            <li>
              <div><span className="icon">⚔️</span> Critical Damage: </div> 
               <div><span className='number'>{this.props.crit}</span></div>
            </li>
            <li>
              <div><span className="icon">🛡</span> Defense: </div>
              <div><span className='number'>{this.props.defense}</span></div>
            </li>
            <li>
             <div> <span className="icon">🏇</span> Movement: </div>
             <div><span className='number'>{this.props.movement}</span></div>
            </li>
            <li>
              <div><span className="icon">🐍</span> Agility: </div>
              <div><span className='number'>{this.props.agility}</span></div>
            </li>
            <li>
             <div> <span className="icon">🏹</span> Archery: </div>
             <div><span className='number'>{this.props.archery}</span></div>
            </li>
            <li>
              <div> <span className="icon">👿</span> Revenge: </div>
              <div><span className='number'>{this.props.currentRevenge}</span></div>
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
  revenge: 0
}

export default Character;
