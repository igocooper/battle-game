import React, { Component } from 'react'

export default class Troop extends Component {
  render() {
    return (
      <div>
        Hi! I'm showing {this.props.match.params.id}
      </div>
    )
  }
}
