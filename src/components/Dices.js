import React, { Component, Fragment } from 'react';
import Dice from './Dice';

class Dices extends Component {
  
  render() {
    return (
    <Fragment>
      <div className="dice-wrapper" onClick={() => {
          this.props.roll()
        }}>
        <Dice color='black' property='attack'/>
        <Dice color='black' property='attack'/>
        <Dice color='red' property='crit'/>
        <Dice color='green' property='dodge'/>
        <Dice color='blue' property='block'/>
        <Dice color='yellow' property='luck'/>
      </div>
    </Fragment>
    );
  }
}

export default Dices;
