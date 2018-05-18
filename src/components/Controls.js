import React, { Component, Fragment } from 'react'

export default class Controls extends Component {
  render() {
    return (
      <Fragment>
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

        <a href="#" 
        className="btn-two green mini" 
        onClick={this.props.round}
        > 
        ⌛️ Round
        </a>
      </Fragment>
    )
  }
}
