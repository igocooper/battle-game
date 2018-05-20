import React, { Component, Fragment } from 'react'
import { Popup } from 'semantic-ui-react'

class HealButton extends Component {
  state = { healing: 10 }

  handleChange = (e)  => {
    const heal = parseInt( e.target.value, 10);
    this.setState({ healing: heal })
  }

  render() {
    const { healing } = this.state;
      return (
          <Popup
              trigger={
                <a href="#" 
                  className="btn-two yellow mini" 
                  onClick={() => this.props.heal(this.state.healing, this.props.who)}
                  > 
                  ❤️ Healing
                </a>}
              flowing
              hoverable
          >
            <div>
              <div>Healing: {healing} ❤️</div>
              <input type='range' min={0} max={100} value={healing} onChange={this.handleChange} />
              <div style={{display:'flex', justifyItems: 'center'}}>
               
              </div>
            </div>
          </Popup>
      )
  }
}

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

        <HealButton {...this.props}/>
      </Fragment>
    )
  }
}
