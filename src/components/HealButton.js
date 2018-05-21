import React, {Component} from 'react'
import { Popup } from 'semantic-ui-react';


class HealButton extends Component {
  state = { healing: 10 }

  _handleChange = (e)  => {
    const heal = parseInt( e.target.value, 10);

    this.setState({ healing: heal });
  };

  _heal = () => {
    this.props.heal(this.state.healing, this.props.playerId);
    setTimeout( () => {
      this.props.updateUnitsInCombat(this.props.battlefield.players.player1, this.props.battlefield.players.player2);
    }, 4);
  };

  render() {
    const { healing } = this.state;
      return (
          <Popup
              trigger={
                <a href="#" 
                  className="btn-two yellow mini fixed" 
                  onClick={this._heal}
                  > 
                  ❤️ Healing
                </a>}
              flowing
              hoverable
          >
            <div>
              <div>Healing: {healing} ❤️</div>
              <input type='range' min={0} max={100} value={healing} onChange={this._handleChange} />
              <div style={{display:'flex', justifyItems: 'center'}}>
               
              </div>
            </div>
          </Popup>
      )
  }
}

export default HealButton;