import React, { Component } from 'react'

export default class Dice extends Component {

  render() {
      const { color, property } = this.props;
    return (
    <div className={`cubic ${color}`} data-property={property}>
        <div className="front"></div>
        <div className="right"></div>
        <div className="bottom"></div>
        <div className="top"></div>
        <div className="left"></div>
        <div className="back"></div>
    </div>
    )
  }
}

Dice.defaultProps = {
    color: 'white',
    property: 'none'
}