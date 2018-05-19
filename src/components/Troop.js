import React, { Component } from 'react'
import { troopsConstants } from '../constants/troops';

import Character from './Character';

export default class Troop extends Component {
  render() {
      const troop = troopsConstants[this.props.match.params.id];
    return (
      <div className='troop'>
       {troop && troop.units.map( unit => {
         return (
             <Character  {...unit} key={unit.name}/>
         )
       })}
      </div>
    )
  }
}
